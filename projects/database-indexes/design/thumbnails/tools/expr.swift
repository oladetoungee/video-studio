// Mouth and eye openness per frame (macOS Vision face landmarks), to find closed-mouth, eyes-open frames.
//   swift tools/expr.swift <dir of jpgs>  -> "<file> mouth <inner-lip gap / face h> eyes <avg eye h/w> yaw <deg> roll <deg>"
import Foundation
import Vision
import CoreImage
let dir = CommandLine.arguments[1]
let fs = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpg") }.sorted()
func span(_ r: VNFaceLandmarkRegion2D?) -> (CGFloat, CGFloat) {
  guard let p = r?.normalizedPoints, !p.isEmpty else { return (0, 1) }
  let xs = p.map { $0.x }, ys = p.map { $0.y }
  return (ys.max()! - ys.min()!, max(0.0001, xs.max()! - xs.min()!))
}
for f in fs {
  guard let ci = CIImage(contentsOf: URL(fileURLWithPath: dir + "/" + f)) else { continue }
  let r = VNDetectFaceLandmarksRequest()
  try? VNImageRequestHandler(ciImage: ci, options: [:]).perform([r])
  guard let face = r.results?.first, let lm = face.landmarks else { print(f, "noface"); continue }
  let m = span(lm.innerLips).0
  let l = span(lm.leftEye), rr = span(lm.rightEye)
  let eyes = (l.0 / l.1 + rr.0 / rr.1) / 2
  let yaw = (face.yaw?.doubleValue ?? 0) * 180 / .pi, roll = (face.roll?.doubleValue ?? 0) * 180 / .pi
  print(f, "mouth", String(format: "%.3f", m), "eyes", String(format: "%.3f", eyes), "yaw", String(format: "%.0f", yaw), "roll", String(format: "%.0f", roll))
}
