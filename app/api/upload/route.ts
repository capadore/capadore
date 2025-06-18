import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Check if it's an image file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename with .webp extension
    const timestamp = Date.now()
    const originalName = file.name.replace(/\.[^/.]+$/, "") // Remove original extension
    const filename = `${timestamp}-${originalName}.webp`
    const path = join(process.cwd(), "public/uploads", filename)

    try {
      // Convert to WebP using Sharp
      await sharp(buffer)
        .webp({
          quality: 85, // Good quality while maintaining smaller file size
          effort: 4, // Good compression effort
        })
        .resize(1200, 1200, {
          fit: "inside",
          withoutEnlargement: true,
        }) // Resize large images while maintaining aspect ratio
        .toFile(path)

      const url = `/uploads/${filename}`

      return NextResponse.json({
        url,
        filename,
        originalName: file.name,
        size: buffer.length,
        convertedFormat: "webp",
      })
    } catch (sharpError) {
      console.error("Sharp conversion failed:", sharpError)

      // Fallback: save original file if Sharp fails
      const fallbackFilename = `${timestamp}-${file.name}`
      const fallbackPath = join(process.cwd(), "public/uploads", fallbackFilename)

      await writeFile(fallbackPath, buffer)

      return NextResponse.json({
        url: `/uploads/${fallbackFilename}`,
        filename: fallbackFilename,
        originalName: file.name,
        size: buffer.length,
        convertedFormat: "original",
        warning: "Image was not converted to WebP due to processing error",
      })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
