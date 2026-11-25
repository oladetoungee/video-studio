// Subject lift (macOS Vision foreground instance mask) -> RGBA PNG cut-out. swift lift.swift in.jpg out.png
import Foundation
import Vision
import CoreImage
let a = CommandLine.arguments
guard let ci = CIImage(contentsOf: URL(fileURLWithPath: a[1])) else { print("bad"); exit(1) }
let req = VNGenerateForegroundInstanceMaskRequest()
let h = VNImageRequestHandler(ciImage: ci, options: [:])
try h.perform([req])
guard let r = req.results?.first else { print("no subject"); exit(2) }
let buf = try r.generateMaskedImage(ofInstances: r.allInstances, from: h, croppedToInstancesExtent: true)
let out = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
try ctx.writePNGRepresentation(of: out, to: URL(fileURLWithPath: a[2]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
print("ok", a[2], Int(out.extent.width), Int(out.extent.height))
