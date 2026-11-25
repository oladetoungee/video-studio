// Full-frame person matte (same size as the input, white = her) with macOS Vision, for "words behind her" stills.
// swift matte.swift in.jpg out.png
import Foundation
import Vision
import CoreImage
import AppKit
let a = CommandLine.arguments
let url = URL(fileURLWithPath: a[1])
guard let ci = CIImage(contentsOf: url) else { print("bad input"); exit(1) }
let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
try VNImageRequestHandler(ciImage: ci, options: [:]).perform([req])
guard let buf = req.results?.first?.pixelBuffer else { print("no person"); exit(2) }
var m = CIImage(cvPixelBuffer: buf)
m = m.transformed(by: CGAffineTransform(scaleX: ci.extent.width / m.extent.width, y: ci.extent.height / m.extent.height))
let ctx = CIContext()
let cs = CGColorSpaceCreateDeviceGray()
try ctx.writePNGRepresentation(of: m, to: URL(fileURLWithPath: a[2]), format: .L8, colorSpace: cs)
print("ok", Int(ci.extent.width), Int(ci.extent.height))
