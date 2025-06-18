"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search, ImageIcon, Package } from "lucide-react"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface ProductManagerProps {
  products: Product[]
  onProductsChange: () => void
}

export default function ProductManager({ products, onProductsChange }: ProductManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState<number | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product? This will also delete all associated images.")) {
      return
    }

    setLoading(productId)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onProductsChange()
        alert("Product deleted successfully")
      } else {
        alert("Failed to delete product")
      }
    } catch (error) {
      alert("Failed to delete product")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products by name, code, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="aspect-[4/3] bg-gray-100 relative">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-12 w-12 text-gray-300" />
                </div>
              )}

              {/* Image Count Badge */}
              {product.images.length > 0 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {product.images.length} image{product.images.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.code}</p>
                </div>
                <Badge variant={product.inStock ? "default" : "secondary"} className="ml-2">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-green-600">{product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
              </div>

              <div className="mb-3">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  disabled={loading === product.id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? "No products found" : "No products yet"}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Start by uploading some images and creating your first product"}
          </p>
        </div>
      )}
    </div>
  )
}
