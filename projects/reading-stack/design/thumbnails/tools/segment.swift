// Person segmentation mask with macOS Vision (offline).
// usage: swift tools/segment.swift <in.jpg> <out_mask.png>
import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else { print("usage: segment in out"); exit(1) }
let url = URL(fileURLWithPath: args[1])
guard let ci = CIImage(contentsOf: url) else { print("cannot read"); exit(1) }
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler = VNImageRequestHandler(ciImage: ci, options: [:])
try handler.perform([req])
guard let obs = req.results?.first else { print("no person"); exit(2) }
var mask = CIImage(cvPixelBuffer: obs.pixelBuffer)
let sx = ci.extent.width / mask.extent.width, sy = ci.extent.height / mask.extent.height
mask = mask.transformed(by: CGAffineTransform(scaleX: sx, y: sy))
let ctx = CIContext()
guard let cg = ctx.createCGImage(mask, from: ci.extent) else { exit(3) }
let rep = NSBitmapImageRep(cgImage: cg)
let data = rep.representation(using: .png, properties: [:])!
try data.write(to: URL(fileURLWithPath: args[2]))
print("ok", Int(ci.extent.width), Int(ci.extent.height), "mask", CVPixelBufferGetWidth(obs.pixelBuffer), CVPixelBufferGetHeight(obs.pixelBuffer))
