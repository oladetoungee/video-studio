// Score video frames for thumbnails with macOS Vision (offline): how open the mouth is, how open the eyes are, head turn.
//   swift tools/facescore.swift <dir of jpgs>   -> prints "file,mouth,eyeL,eyeR,yaw,roll,faceH" per frame (mouth = inner-lip gap / face height)
// Low mouth + open eyes + small yaw = a calm, closed-mouth, looking-at-you frame (her thumbnail rule).
import Foundation
import Vision
import AppKit

let dir = CommandLine.arguments[1]
let files = (try? FileManager.default.contentsOfDirectory(atPath: dir))?.filter { $0.hasSuffix(".jpg") }.sorted() ?? []
func span(_ pts: [CGPoint]) -> (CGFloat, CGFloat) {
  let xs = pts.map { $0.x }, ys = pts.map { $0.y }
  return ((xs.max() ?? 0) - (xs.min() ?? 0), (ys.max() ?? 0) - (ys.min() ?? 0))
}
for f in files {
  let url = URL(fileURLWithPath: dir + "/" + f)
  guard let img = NSImage(contentsOf: url), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
  let req = VNDetectFaceLandmarksRequest()
  try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
  guard let face = (req.results ?? []).max(by: { $0.boundingBox.height < $1.boundingBox.height }), let lm = face.landmarks else { print("\(f),,,,,,"); continue }
  var mouth: CGFloat = -1, eL: CGFloat = -1, eR: CGFloat = -1
  if let il = lm.innerLips?.normalizedPoints { mouth = span(il).1 }
  if let l = lm.leftEye?.normalizedPoints { let s = span(l); eL = s.0 > 0 ? s.1 / s.0 : -1 }
  if let r = lm.rightEye?.normalizedPoints { let s = span(r); eR = s.0 > 0 ? s.1 / s.0 : -1 }
  let yaw = face.yaw?.doubleValue ?? 0, roll = face.roll?.doubleValue ?? 0
  print(String(format: "%@,%.4f,%.3f,%.3f,%.2f,%.2f,%.3f", f, mouth, eL, eR, yaw, roll, face.boundingBox.height))
}
