"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, ImageIcon, Upload } from "lucide-react"
import ProductManager from "./product-manager"
import ImageUploader from "./image-uploader"
import type { Product } from "@/lib/types"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CAPADORE Admin</h1>
              <p className="text-gray-600 mt-1">Manage your products and images</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {products.length} products • {products.reduce((acc, p) => acc + p.images.length, 0)} images
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Image Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Product Management
                  <Button onClick={() => setActiveTab("images")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Images
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductManager products={products} onProductsChange={fetchProducts} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Image Upload & Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader products={products} onProductsChange={fetchProducts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
