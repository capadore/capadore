import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { CreateProductRequest } from "@/lib/types"

export async function GET() {
  try {
    const products = db.getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProductRequest = await request.json()

    const product = db.createProduct({
      ...body,
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
