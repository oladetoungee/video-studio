// Scan her recording for thumbnail-friendly frames: mouth openness and eye openness per time (macOS Vision face landmarks).
//   swift tools/expr.swift <video> <step seconds> > tools/expr.tsv      (heavy: run under the machine lock)
// Columns: t, mouth (inner-lip gap / face height), eyes (mean eye height / face height), face x centre (0-1), face width (0-1)
import Foundation; import AVFoundation; import Vision; import CoreImage
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1])); let step = Double(a[2])!
let gen = AVAssetImageGenerator(asset: asset); gen.maximumSize = CGSize(width: 960, height: 540)
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero; gen.appliesPreferredTrackTransform = true
let dur = CMTimeGetSeconds(asset.duration)
func span(_ pts: [CGPoint]) -> CGFloat { let ys = pts.map { $0.y }; return (ys.max() ?? 0) - (ys.min() ?? 0) }
var t = 0.0
while t < dur {
  if let cg = try? gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil) {
    let r = VNDetectFaceLandmarksRequest()
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([r])
    if let f = r.results?.first, let lm = f.landmarks {
      let m = lm.innerLips.map { span($0.normalizedPoints) } ?? -1
      let e = ((lm.leftEye.map { span($0.normalizedPoints) } ?? 0) + (lm.rightEye.map { span($0.normalizedPoints) } ?? 0)) / 2
      print(String(format: "%.2f\t%.3f\t%.3f\t%.3f\t%.3f", t, m, e, f.boundingBox.midX, f.boundingBox.width))
    }
  }
  t += step
}
