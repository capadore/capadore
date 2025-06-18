import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const { url, alt, order } = await request.json()

    const image = db.addImageToProduct(productId, { url, alt, order })

    if (!image) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const { imageOrders } = await request.json()

    const success = db.updateImageOrder(productId, imageOrders)

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Image order updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update image order" }, { status: 500 })
  }
}
