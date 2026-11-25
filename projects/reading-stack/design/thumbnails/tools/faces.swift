// Print face bounding boxes (pixels, top-left origin) for images, via macOS Vision.
import Foundation
import Vision
import CoreImage
for p in CommandLine.arguments.dropFirst() {
  guard let ci = CIImage(contentsOf: URL(fileURLWithPath: p)) else { continue }
  let r = VNDetectFaceRectanglesRequest()
  try? VNImageRequestHandler(ciImage: ci, options: [:]).perform([r])
  let W = ci.extent.width, H = ci.extent.height
  for f in r.results ?? [] {
    let b = f.boundingBox
    print(p.split(separator: "/").last!, Int(W), Int(H), "face x", Int(b.minX * W), "y", Int((1 - b.maxY) * H), "w", Int(b.width * W), "h", Int(b.height * H))
  }
}
