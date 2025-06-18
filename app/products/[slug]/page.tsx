import { notFound } from "next/navigation"
import ProductDetail from "./product-detail"
import { db } from "@/lib/db"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = db.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export function generateStaticParams() {
  const products = db.getAllProducts()

  return products.map((product) => ({
    slug: product.slug,
  }))
}
