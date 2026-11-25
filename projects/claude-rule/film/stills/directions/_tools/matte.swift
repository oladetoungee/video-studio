// Full-frame person matte (same size as the input, white = her) with macOS Vision, offline.
// swift matte.swift <in.jpg> <out_matte.png>
import Foundation; import Vision; import CoreImage; import AppKit
let a = CommandLine.arguments
let img = CIImage(contentsOf: URL(fileURLWithPath: a[1]))!
let req = VNGeneratePersonSegmentationRequest(); req.qualityLevel = .accurate; req.outputPixelFormat = kCVPixelFormatType_OneComponent8
try! VNImageRequestHandler(ciImage: img, options: [:]).perform([req])
let pb = req.results!.first!.pixelBuffer
var m = CIImage(cvPixelBuffer: pb)
m = m.transformed(by: CGAffineTransform(scaleX: img.extent.width / m.extent.width, y: img.extent.height / m.extent.height))
let ctx = CIContext()
let cg = ctx.createCGImage(m, from: img.extent)!
let rep = NSBitmapImageRep(cgImage: cg)
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: a[2]))
print("ok", Int(img.extent.width), Int(img.extent.height))
