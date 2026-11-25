// Remove the background of a photo with macOS Vision (offline): a transparent PNG cut-out, cropped to the subject.
//   swift studio/tools/cutout.swift <in.jpg|png> <out.png> [auto|person|object|both]
//   person  VNGeneratePersonSegmentationRequest, quality .accurate (people, hair)
//   object  VNGenerateForegroundInstanceMaskRequest (macOS 14+): the main foreground things (books, objects, people)
//   auto    (default) the person mask, kept only where the foreground mask agrees (no sofa or chair leaking in);
//           whichever of the two exists when Vision finds only one (objects alone: a book on a table)
//   both    the two masks merged (keeps the person mask's softer hair, but it can leak into what is behind her)
// Prints "@progress <0..1> <stage>" lines while it works and "ok <w> <h> <mode used>" at the end.
// The studio server runs it for "Remove background" in the design editor's photo picker (POST /api/<slug>/uploads/cutout).
import Foundation
import Vision
import CoreImage
import AppKit

func say(_ s: String) { print(s); fflush(stdout) }
func fail(_ msg: String, _ code: Int32) -> Never { FileHandle.standardError.write((msg + "\n").data(using: .utf8)!); exit(code) }

let args = CommandLine.arguments
guard args.count >= 3 else { fail("usage: swift cutout.swift in out [auto|person|object|both]", 1) }
let mode = args.count > 3 ? args[3] : "auto"
say("@progress 0.05 reading")
guard let img = CIImage(contentsOf: URL(fileURLWithPath: args[1]), options: [.applyOrientationProperty: true]) else { fail("cannot read the photo", 1) }
let ext = img.extent
let handler = VNImageRequestHandler(ciImage: img, options: [:])
var masks: [CIImage] = []
var used: [String] = []

func scaled(_ buf: CVPixelBuffer) -> CIImage {
  let m = CIImage(cvPixelBuffer: buf)
  return m.transformed(by: CGAffineTransform(scaleX: ext.width / m.extent.width, y: ext.height / m.extent.height))
}

func person() {
  say("@progress 0.15 finding the person")
  // the segmentation always returns a mask, even with nobody in the photo: only use it when Vision sees a person
  let body = VNDetectHumanRectanglesRequest(), face = VNDetectFaceRectanglesRequest()
  try? handler.perform([body, face])
  if (body.results ?? []).isEmpty && (face.results ?? []).isEmpty { if mode == "person" { fail("no person found in this photo", 3) }; return }
  let req = VNGeneratePersonSegmentationRequest()
  req.qualityLevel = .accurate
  req.outputPixelFormat = kCVPixelFormatType_OneComponent8
  do { try handler.perform([req]) } catch { if mode == "person" { fail("Vision failed: \(error)", 2) } }
  if let obs = req.results?.first { masks.append(scaled(obs.pixelBuffer)); used.append("person") }
}
func objects() {
  if #available(macOS 14.0, *) {
    say("@progress 0.5 finding objects")
    let req = VNGenerateForegroundInstanceMaskRequest()
    do {
      try handler.perform([req])
      if let obs = req.results?.first, !obs.allInstances.isEmpty {
        let buf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
        masks.append(scaled(buf)); used.append("objects")
      }
    } catch { if mode == "object" { fail("Vision failed: \(error)", 2) } }
  } else if mode == "object" { fail("object cut-outs need macOS 14 or later", 2) }
}
switch mode {
case "person": person()
case "object": objects()
default: person(); objects()
}
guard var mask = masks.first else { fail("no person or object found in this photo", 3) }
if masks.count == 2 {
  if mode == "both" { mask = masks[1].applyingFilter("CIMaximumCompositing", parameters: [kCIInputBackgroundImageKey: mask]) }
  else {
    // auto: the person mask (soft hair, the book in her hands) kept only where Vision also sees foreground (a slightly
    // grown foreground mask), so the sofa or wall behind her does not leak in. The chair she sits in is foreground
    // but not person, so it goes too.
    let grown = masks[1].applyingFilter("CIMorphologyMaximum", parameters: [kCIInputRadiusKey: max(2.0, 0.006 * max(ext.width, ext.height))]).cropped(to: ext)
    mask = masks[0].applyingFilter("CIMinimumCompositing", parameters: [kCIInputBackgroundImageKey: grown])
    used = ["person+foreground"]
  }
}
mask = mask.cropped(to: ext)

say("@progress 0.8 cutting out")
let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
// bounding box of the subject from a small copy of the mask
let sw = 512.0, sk = min(1.0, sw / max(ext.width, ext.height))
let small = mask.transformed(by: CGAffineTransform(scaleX: sk, y: sk))
let W = Int((ext.width * sk).rounded(.down)), H = Int((ext.height * sk).rounded(.down))
var px = [UInt8](repeating: 0, count: W * H * 4)
ctx.render(small, toBitmap: &px, rowBytes: W * 4, bounds: CGRect(x: 0, y: 0, width: W, height: H), format: .RGBA8, colorSpace: CGColorSpaceCreateDeviceRGB())
var x0 = W, y0 = H, x1 = -1, y1 = -1
for y in 0..<H { for x in 0..<W where px[(y * W + x) * 4] > 24 { x0 = min(x0, x); x1 = max(x1, x); y0 = min(y0, y); y1 = max(y1, y) } }
guard x1 >= 0 else { fail("the cut-out is empty", 3) }
// rows of the bitmap run bottom-up in Core Image space; pad by 3 % of the longer side
let padPx = 0.03 * max(ext.width, ext.height)
var crop = ext  // full frame (thumbnails: mask aligned with the scene photo)

let clear = CIImage(color: .clear).cropped(to: ext)
let out = img.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: clear, kCIInputMaskImageKey: mask]).cropped(to: crop)
say("@progress 0.92 writing")
guard let cg = ctx.createCGImage(out, from: crop, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)) else { fail("could not render the cut-out", 4) }
let rep = NSBitmapImageRep(cgImage: cg)
guard let data = rep.representation(using: .png, properties: [:]) else { fail("could not encode PNG", 4) }
do { try data.write(to: URL(fileURLWithPath: args[2])) } catch { fail("could not write: \(error)", 4) }
crop = crop.integral
say("@progress 1 done")
say("ok \(Int(crop.width)) \(Int(crop.height)) \(used.joined(separator: "+"))")
