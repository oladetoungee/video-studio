// "Enhance photo": the "pronounced" thumbnail look (THUMBNAILS.md, her note 2026-11-08), offline, macOS Vision + Core Image.
//   swift studio/tools/enhance.swift <in.jpg|png> <out.png> [--bg keep|calm|dark] [--long 2560] [--cutout <out-cutout.png>]
//                                    [--strength 0..1.5]
// What it does to HER (inside the Vision person mask):
//   upscale (Lanczos) to --long px on the long side when smaller, light noise clean-up, shadows lifted / highlights held,
//   local contrast ("clarity", wide unsharp mask), fine detail sharpen (eyes, hair edges), a little vibrance,
//   face relight (soft warm brightening centred on each face Vision finds), a thin light rim on her outline.
// What it does BEHIND her (--bg): keep = untouched; calm (default) = darker, less colour, slightly soft, so she separates;
//   dark = much darker and greyer (for text over the room).
// Never: reshape the face, smooth skin, flip, change colours of her clothes beyond the shared vibrance.
// --cutout also writes her enhanced cut-out (transparent PNG, full frame) for collage / flat-ground thumbnails.
// Prints "@progress <0..1> <stage>" lines and "ok <w> <h> faces=<n> person=<yes|no>" at the end.
import Foundation
import Vision
import CoreImage
import AppKit

func say(_ s: String) { print(s); fflush(stdout) }
func fail(_ msg: String, _ code: Int32) -> Never { FileHandle.standardError.write((msg + "\n").data(using: .utf8)!); exit(code) }

var pos: [String] = []; var bgMode = "calm"; var longSide: CGFloat = 2560; var cutPath: String? = nil; var k: CGFloat = 1
var it = CommandLine.arguments.dropFirst().makeIterator()
while let a = it.next() {
  switch a {
  case "--bg": bgMode = it.next() ?? "calm"
  case "--long": longSide = CGFloat(Double(it.next() ?? "") ?? 2560)
  case "--cutout": cutPath = it.next()
  case "--strength": k = CGFloat(Double(it.next() ?? "") ?? 1)
  default: pos.append(a)
  }
}
guard pos.count >= 2 else { fail("usage: swift enhance.swift in out [--bg keep|calm|dark] [--long 2560] [--cutout file] [--strength 1]", 1) }

say("@progress 0.05 reading")
guard var img = CIImage(contentsOf: URL(fileURLWithPath: pos[0]), options: [.applyOrientationProperty: true]) else { fail("cannot read the photo", 1) }
img = img.transformed(by: CGAffineTransform(translationX: -img.extent.minX, y: -img.extent.minY))

func f(_ name: String, _ input: CIImage, _ p: [String: Any]) -> CIImage {
  let fl = CIFilter(name: name)!; fl.setValue(input, forKey: kCIInputImageKey)
  for (key, v) in p { fl.setValue(v, forKey: key) }
  return fl.outputImage!
}

// 1. size up small photos (soft phone shots, small uploads) before any detail work
let m0 = max(img.extent.width, img.extent.height)
let upscaled = m0 < longSide
if upscaled {
  say("@progress 0.12 upscaling")
  img = f("CILanczosScaleTransform", img, [kCIInputScaleKey: longSide / m0, kCIInputAspectRatioKey: 1.0])
  img = img.cropped(to: CGRect(x: 0, y: 0, width: floor(img.extent.width), height: floor(img.extent.height)))
}
let ext = img.extent, M = max(ext.width, ext.height)
let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])

// cool cast (her room light, camera white balance): pull blue back toward neutral, half way. Warm photos are left alone.
do {
  var px = [UInt8](repeating: 0, count: 4)
  let avg = f("CIAreaAverage", img, [kCIInputExtentKey: CIVector(cgRect: ext)])
  ctx.render(avg, toBitmap: &px, rowBytes: 4, bounds: CGRect(x: 0, y: 0, width: 1, height: 1), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  let r = max(1, CGFloat(px[0])), g = max(1, CGFloat(px[1])), b = max(1, CGFloat(px[2]))
  if b > r * 0.98 {
    let grey = (r + g + b) / 3
    let gr = 1 + (grey / r - 1) * 0.5, gg = 1 + (grey / g - 1) * 0.5, gb = 1 + (grey / b - 1) * 0.5
    img = f("CIColorMatrix", img, ["inputRVector": CIVector(x: gr, y: 0, z: 0, w: 0), "inputGVector": CIVector(x: 0, y: gg, z: 0, w: 0),
                                   "inputBVector": CIVector(x: 0, y: 0, z: gb, w: 0)])
    say("@progress 0.18 white balance r\(Int(r)) g\(Int(g)) b\(Int(b))")
  }
}
guard let cg = ctx.createCGImage(img, from: ext) else { fail("cannot decode", 1) }

// 2. find her: person mask + faces
say("@progress 0.25 finding her")
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
let faceReq = VNDetectFaceRectanglesRequest(), bodyReq = VNDetectHumanRectanglesRequest()
try? handler.perform([faceReq, bodyReq])
let faces = (faceReq.results ?? []).map { r -> CGRect in
  let b = r.boundingBox; return CGRect(x: b.minX * ext.width, y: b.minY * ext.height, width: b.width * ext.width, height: b.height * ext.height)
}
var mask: CIImage? = nil
if !(faces.isEmpty && (bodyReq.results ?? []).isEmpty) {
  let seg = VNGeneratePersonSegmentationRequest(); seg.qualityLevel = .accurate
  seg.outputPixelFormat = kCVPixelFormatType_OneComponent8
  try? handler.perform([seg])
  if let buf = seg.results?.first?.pixelBuffer {
    let mm = CIImage(cvPixelBuffer: buf)
    mask = mm.transformed(by: CGAffineTransform(scaleX: ext.width / mm.extent.width, y: ext.height / mm.extent.height))
      .clampedToExtent().applyingGaussianBlur(sigma: Double(M / 1800)).cropped(to: ext)
  }
}
let faceH = faces.map { $0.height }.max() ?? M * 0.18

// 3. her: clean, lift, clarity, detail, colour
say("@progress 0.45 enhancing her")
var s = img
if upscaled { s = f("CINoiseReduction", s, ["inputNoiseLevel": 0.012, "inputSharpness": 0.5]) }
// how dark is her face already? (0..1 luma, middle of the biggest face). Bright photos (her phone shoot) get no extra light;
// dim ones (video frames, evening room) get lifted. Her note 2026-11-08: "my face looks a little bit too light".
var faceLum: CGFloat = 0.3
if let fr = faces.max(by: { $0.height < $1.height }) {
  var px = [UInt8](repeating: 0, count: 4)
  let inner = fr.insetBy(dx: fr.width * 0.2, dy: fr.height * 0.2)
  let avg = f("CIAreaAverage", img, [kCIInputExtentKey: CIVector(cgRect: inner)])
  ctx.render(avg, toBitmap: &px, rowBytes: 4, bounds: CGRect(x: 0, y: 0, width: 1, height: 1), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  faceLum = (0.2126 * CGFloat(px[0]) + 0.7152 * CGFloat(px[1]) + 0.0722 * CGFloat(px[2])) / 255
}
let dark = min(1, max(0, (0.40 - faceLum) / 0.18))   // 0 = already bright enough, 1 = dim
say("@progress 0.4 face light \(Int(faceLum * 100))% lift \(Int(dark * 100))%")
s = f("CIHighlightShadowAdjust", s, ["inputShadowAmount": (0.1 + 0.3 * dark) * k, "inputHighlightAmount": 1 - 0.1 * k, kCIInputRadiusKey: faceH * 0.05])
let base = s

// soft mask over each face (1 in the middle, fading out by about one face-width)
var faceMask = CIImage(color: CIColor(red: 0, green: 0, blue: 0)).cropped(to: ext)
for fr in faces {
  let c = CIVector(x: fr.midX, y: fr.midY + fr.height * 0.05)
  let g = CIFilter(name: "CIRadialGradient", parameters: ["inputCenter": c, "inputRadius0": fr.width * 0.6, "inputRadius1": fr.width * 1.15,
    "inputColor0": CIColor(red: 1, green: 1, blue: 1), "inputColor1": CIColor(red: 0, green: 0, blue: 0)])!.outputImage!.cropped(to: ext)
  faceMask = f("CILightenBlendMode", g, [kCIInputBackgroundImageKey: faceMask])
}

// body, clothes, hair outside the face: clarity + detail + a little vibrance (the "pronounced" crunch)
var body = f("CIUnsharpMask", base.clampedToExtent(), [kCIInputRadiusKey: faceH * 0.08, kCIInputIntensityKey: 0.24 * k]).cropped(to: ext)
body = f("CIUnsharpMask", body.clampedToExtent(), [kCIInputRadiusKey: max(1.0, faceH / 260), kCIInputIntensityKey: 0.6 * k]).cropped(to: ext)
body = f("CIVibrance", body, ["inputAmount": 0.08 * k])

// face: her skin is left as it is (no clarity, no grit, no extra shine, no colour push); only a very fine sharpen so eyes,
// lashes, brows and hairline read crisp, plus a gentle brightening. (Her note 2026-11-08: "the skin is weird".)
var face = f("CINoiseReduction", base, ["inputNoiseLevel": 0.01, "inputSharpness": 0.2])
face = f("CISharpenLuminance", face, [kCIInputSharpnessKey: 0.35 * k, kCIInputRadiusKey: max(1.0, faceH / 700)])
face = f("CIExposureAdjust", face, [kCIInputEVKey: 0.18 * dark * k])

s = faces.isEmpty ? body : f("CIBlendWithMask", face, [kCIInputBackgroundImageKey: body, kCIInputMaskImageKey: faceMask])
s = f("CIColorControls", s, [kCIInputContrastKey: 1 + 0.04 * k, kCIInputSaturationKey: 1.0, kCIInputBrightnessKey: 0.0])

// 4. behind her
say("@progress 0.7 calming the background")
var bg = img
switch bgMode {
case "keep": break
case "dark":
  bg = f("CIColorControls", f("CIExposureAdjust", bg, [kCIInputEVKey: -1.1]), [kCIInputSaturationKey: 0.35, kCIInputContrastKey: 0.95, kCIInputBrightnessKey: 0.0])
  bg = bg.clampedToExtent().applyingGaussianBlur(sigma: Double(M / 500)).cropped(to: ext)
default:
  bg = f("CIColorControls", f("CIExposureAdjust", bg, [kCIInputEVKey: -0.45]), [kCIInputSaturationKey: 0.6, kCIInputContrastKey: 0.97, kCIInputBrightnessKey: 0.0])
  bg = bg.clampedToExtent().applyingGaussianBlur(sigma: Double(M / 900)).cropped(to: ext)
}

var out = s
if let mk0 = mask {
  // pull her outline in a hair so the bright wall behind her never shows as a light line on her edge
  let mk = f("CIMorphologyMinimum", mk0.clampedToExtent(), [kCIInputRadiusKey: max(1, M / 1300)]).applyingGaussianBlur(sigma: Double(M / 2200)).cropped(to: ext)
  // thin light rim just inside her outline: mask minus a slightly eroded mask
  let inner = f("CIMorphologyMinimum", mk.clampedToExtent(), [kCIInputRadiusKey: max(1.5, M / 1100)]).cropped(to: ext)
  let edge = f("CISubtractBlendMode", mk, [kCIInputBackgroundImageKey: mk, kCIInputImageKey: inner])
  let rimMask = f("CIDifferenceBlendMode", inner, [kCIInputBackgroundImageKey: mk]).clampedToExtent().applyingGaussianBlur(sigma: Double(M / 1500)).cropped(to: ext)
  _ = edge
  let rimLit = f("CIExposureAdjust", s, [kCIInputEVKey: 0.3 * k])
  let sRim = (bgMode == "keep" || longSide / m0 > 2) ? s :   // no rim on tiny photos: the soft edge would show as a light line
    f("CIBlendWithMask", rimLit, [kCIInputBackgroundImageKey: s, kCIInputMaskImageKey: rimMask])
  out = f("CIBlendWithMask", sRim, [kCIInputBackgroundImageKey: bg, kCIInputMaskImageKey: mk])
  if let cp = cutPath {
    let clear = CIImage(color: CIColor(red: 0, green: 0, blue: 0, alpha: 0)).cropped(to: ext)
    let cut = f("CIBlendWithMask", sRim, [kCIInputBackgroundImageKey: clear, kCIInputMaskImageKey: mk])
    try? ctx.writePNGRepresentation(of: cut, to: URL(fileURLWithPath: cp), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  }
}

say("@progress 0.9 saving")
do { try ctx.writePNGRepresentation(of: out, to: URL(fileURLWithPath: pos[1]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!) }
catch { fail("cannot write: \(error)", 2) }
say("ok \(Int(ext.width)) \(Int(ext.height)) faces=\(faces.count) person=\(mask == nil ? "no" : "yes")")
