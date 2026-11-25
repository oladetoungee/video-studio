// Per frame: face box, mouth openness (inner-lip height / face height), eye openness, head yaw/roll, and hands
// (highest fingertip, whether the index finger points up above the face). For picking expressive, mouth-closed frames.
//   swift tools/expr.swift <dir of jpgs>  -> TSV on stdout
import Foundation
import Vision
import CoreImage
let dir = CommandLine.arguments[1]
let files = try! FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpg") }.sorted()
print("file\tfx\tfy\tfw\tmouth\teyes\tyaw\troll\tpoint\thandTop\tnhands")
for f in files {
  guard let ci = CIImage(contentsOf: URL(fileURLWithPath: dir + "/" + f)) else { continue }
  let fr = VNDetectFaceLandmarksRequest(); let hr = VNDetectHumanHandPoseRequest(); hr.maximumHandCount = 2
  try? VNImageRequestHandler(ciImage: ci, options: [:]).perform([fr, hr])
  guard let face = fr.results?.first else { print("\(f)\t-"); continue }
  let b = face.boundingBox
  func h(_ r: VNFaceLandmarkRegion2D?) -> Double { guard let p = r?.normalizedPoints, !p.isEmpty else { return -1 }
    let ys = p.map { Double($0.y) }; return (ys.max()! - ys.min()!) * Double(b.height) / Double(b.height) }
  let mouth = h(face.landmarks?.innerLips)
  let eyes = (h(face.landmarks?.leftEye) + h(face.landmarks?.rightEye)) / 2
  var point = 0.0, top = 0.0
  for hand in hr.results ?? [] {
    guard let pts = try? hand.recognizedPoints(.all) else { continue }
    let tips: [VNHumanHandPoseObservation.JointName] = [.indexTip, .middleTip, .ringTip, .littleTip]
    let ys = tips.map { (pts[$0]?.confidence ?? 0) > 0.3 ? Double(pts[$0]!.location.y) : -1 }
    top = max(top, ys.max() ?? 0)
    if ys[0] > 0 && ys[0] - max(ys[1], ys[2], ys[3]) > 0.06 { point = max(point, ys[0]) }
  }
  print("\(f)\t\(String(format: "%.3f\t%.3f\t%.3f\t%.3f\t%.3f\t%.1f\t%.1f\t%.3f\t%.3f\t%d", b.minX, 1 - b.maxY, b.width, mouth, eyes, (face.yaw?.doubleValue ?? 0) * 57.3, (face.roll?.doubleValue ?? 0) * 57.3, point, top, hr.results?.count ?? 0))")
}
