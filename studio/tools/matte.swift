// Person matte for a talking-head video (macOS Vision VNGeneratePersonSegmentationRequest).
// Reads raw RGB24 frames (inW x inH) on stdin, writes one raw 8-bit grey matte per frame (outW x outH, white = her) on stdout.
//   ffmpeg -i in.mov -vf scale=960:540 -f rawvideo -pix_fmt rgb24 - | matte <inW> <inH> <outW> <outH> [accurate|balanced|fast]
// Driven by studio/tools/matte.py (compiled once into studio/.cache/matte). Frames are processed in order with a sequence
// handler (Vision keeps the matte steady from frame to frame). Nothing is written to disk.
import Foundation
import Vision
import CoreImage
import CoreGraphics

let a = CommandLine.arguments
let W = Int(a[1])!, H = Int(a[2])!, OW = Int(a[3])!, OH = Int(a[4])!
let quality = a.count > 5 ? a[5] : "accurate"
let frameBytes = W * H * 3
let input = FileHandle.standardInput
let out = FileHandle.standardOutput
let cs = CGColorSpaceCreateDeviceRGB()
let gray = CGColorSpaceCreateDeviceGray()
let seq = VNSequenceRequestHandler()
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = quality == "fast" ? .fast : quality == "balanced" ? .balanced : .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let ci = CIContext(options: [.workingColorSpace: NSNull(), .outputColorSpace: NSNull()])
var buf = Data()
var outBuf = [UInt8](repeating: 0, count: OW * OH)
// Keep her, drop the rest: the largest connected region of the matte (over half on) is her; things Vision also lifts
// (a cushion, a poster) are separate regions and are cleared. Soft edges around her are kept (the region is grown 3 px).
var lab = [Int32](repeating: 0, count: OW * OH)
var stack = [Int]()
func keepLargest() {
    let n = OW * OH
    for i in 0..<n { lab[i] = 0 }
    var best: Int32 = 0, bestSize = 0, cur: Int32 = 0
    for s in 0..<n where outBuf[s] > 127 && lab[s] == 0 {
        cur += 1; var size = 0; stack.removeAll(keepingCapacity: true); stack.append(s); lab[s] = cur
        while let p = stack.popLast() {
            size += 1; let x = p % OW, y = p / OW
            if x > 0 { let q = p - 1; if lab[q] == 0 && outBuf[q] > 127 { lab[q] = cur; stack.append(q) } }
            if x < OW - 1 { let q = p + 1; if lab[q] == 0 && outBuf[q] > 127 { lab[q] = cur; stack.append(q) } }
            if y > 0 { let q = p - OW; if lab[q] == 0 && outBuf[q] > 127 { lab[q] = cur; stack.append(q) } }
            if y < OH - 1 { let q = p + OW; if lab[q] == 0 && outBuf[q] > 127 { lab[q] = cur; stack.append(q) } }
        }
        if size > bestSize { bestSize = size; best = cur }
    }
    if best == 0 { return }
    // distance (in px, up to 3) to her region: a row pass and a column pass of a chessboard distance
    var d = [UInt8](repeating: 9, count: n)
    for i in 0..<n where lab[i] == best { d[i] = 0 }
    for _ in 0..<3 {
        var nd = d
        for y in 0..<OH { for x in 0..<OW { let i = y * OW + x; if d[i] == 0 { continue }
            var m = d[i]
            if x > 0 { m = min(m, d[i - 1] &+ 1) }; if x < OW - 1 { m = min(m, d[i + 1] &+ 1) }
            if y > 0 { m = min(m, d[i - OW] &+ 1) }; if y < OH - 1 { m = min(m, d[i + OW] &+ 1) }
            nd[i] = m } }
        d = nd
    }
    for i in 0..<n where d[i] > 3 { outBuf[i] = 0 }
}
while true {
    while buf.count < frameBytes {
        let chunk = input.readData(ofLength: frameBytes - buf.count)
        if chunk.isEmpty { break }
        buf.append(chunk)
    }
    if buf.count < frameBytes { break }
    let frame = buf.prefix(frameBytes); buf = Data(buf.dropFirst(frameBytes))
    let provider = CGDataProvider(data: frame as CFData)!
    let img = CGImage(width: W, height: H, bitsPerComponent: 8, bitsPerPixel: 24, bytesPerRow: W * 3, space: cs,
                      bitmapInfo: CGBitmapInfo(rawValue: 0), provider: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)!
    var ok = false
    if (try? seq.perform([req], on: img)) != nil, let pb = req.results?.first?.pixelBuffer {
        var m = CIImage(cvPixelBuffer: pb)
        m = m.transformed(by: CGAffineTransform(scaleX: CGFloat(OW) / m.extent.width, y: CGFloat(OH) / m.extent.height))
        outBuf.withUnsafeMutableBytes { p in
            ci.render(m, toBitmap: p.baseAddress!, rowBytes: OW, bounds: CGRect(x: 0, y: 0, width: OW, height: OH), format: .L8, colorSpace: nil)
        }
        ok = true
        keepLargest()
    }
    if !ok { for i in 0..<outBuf.count { outBuf[i] = 0 } }
    out.write(Data(outBuf))
}
