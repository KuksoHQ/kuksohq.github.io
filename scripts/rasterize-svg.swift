import AppKit
import Foundation

guard CommandLine.arguments.count == 4,
      let side = Int(CommandLine.arguments[3]), side > 0 else {
    fputs("usage: rasterize-svg.swift input.svg output.png pixel-size\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])

guard let image = NSImage(contentsOf: inputURL) else {
    fputs("could not load SVG: \(inputURL.path)\n", stderr)
    exit(1)
}

guard let bitmap = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: side,
    pixelsHigh: side,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
) else {
    fputs("could not create output bitmap\n", stderr)
    exit(1)
}

NSGraphicsContext.saveGraphicsState()
let context = NSGraphicsContext(bitmapImageRep: bitmap)
NSGraphicsContext.current = context
context?.imageInterpolation = .high
image.draw(
    in: NSRect(x: 0, y: 0, width: side, height: side),
    from: .zero,
    operation: .sourceOver,
    fraction: 1,
    respectFlipped: false,
    hints: [.interpolation: NSImageInterpolation.high]
)
context?.flushGraphics()
NSGraphicsContext.restoreGraphicsState()

guard let png = bitmap.representation(using: .png, properties: [:]) else {
    fputs("could not encode output PNG\n", stderr)
    exit(1)
}

do {
    try png.write(to: outputURL, options: .atomic)
} catch {
    fputs("could not write output PNG: \(error)\n", stderr)
    exit(1)
}
