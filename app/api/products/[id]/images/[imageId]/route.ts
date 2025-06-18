import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string; imageId: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const { imageId } = params

    const success = db.deleteImage(productId, imageId)

    if (!success) {
      return NextResponse.json({ error: "Product or image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Image deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
