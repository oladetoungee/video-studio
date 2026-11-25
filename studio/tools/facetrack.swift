// Face track for a talking-head video (macOS Vision). Reads raw RGB24 frames on stdin, writes one JSON line per frame:
//   {"i": frame index, "f": [x, y, w, h] (normalised, origin top-left) | null, "c": confidence}
// Usage (studio/tools/facetrack.mjs drives it):
//   ffmpeg -i in.mov -vf fps=6,scale=640:360 -f rawvideo -pix_fmt rgb24 - | swift facetrack.swift 640 360
import Foundation
import Vision
import CoreGraphics

let args = CommandLine.arguments
let W = Int(args[1])!, H = Int(args[2])!
let frameBytes = W * H * 3
let input = FileHandle.standardInput
var index = 0
var buf = Data()
let cs = CGColorSpaceCreateDeviceRGB()
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
    let req = VNDetectFaceRectanglesRequest()
    let h = VNImageRequestHandler(cgImage: img, options: [:])
    try? h.perform([req])
    var best: VNFaceObservation? = nil
    for o in req.results ?? [] { if best == nil || o.boundingBox.width * o.boundingBox.height > best!.boundingBox.width * best!.boundingBox.height { best = o } }
    if let b = best {
        let r = b.boundingBox
        print(String(format: "{\"i\":%d,\"f\":[%.4f,%.4f,%.4f,%.4f],\"c\":%.3f}", index, r.minX, 1 - r.maxY, r.width, r.height, b.confidence))
    } else { print("{\"i\":\(index),\"f\":null}") }
    fflush(stdout)
    index += 1
}
