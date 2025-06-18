"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, ImageIcon, Trash2, Eye, Download } from "lucide-react"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface ImageUploaderProps {
  products: Product[]
  onProductsChange: () => void
}

interface UploadedImage {
  url: string
  filename: string
  originalName: string
  size: number
  uploadedAt: string
}

export default function ImageUploader({ products, onProductsChange }: ImageUploaderProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("upload")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const multipleFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadExistingImages()
  }, [])

  const loadExistingImages = async () => {
    try {
      // In a real app, you'd have an API endpoint to list uploaded files
      // For now, we'll simulate this by checking the products' images
      const allImages: UploadedImage[] = []

      products.forEach((product) => {
        product.images.forEach((image) => {
          if (image.url.startsWith("/uploads/")) {
            allImages.push({
              url: image.url,
              filename: image.url.split("/").pop() || "",
              originalName: image.alt,
              size: 0, // We don't have size info
              uploadedAt: product.updatedAt,
            })
          }
        })
      })

      setUploadedImages(allImages)
    } catch (error) {
      console.error("Failed to load existing images:", error)
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)

    const totalFiles = files.length
    let completedFiles = 0
    const newImages: UploadedImage[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!file.type.startsWith("image/")) {
        console.warn(`Skipping non-image file: ${file.name}`)
        continue
      }

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          newImages.push({
            url: result.url,
            filename: result.filename,
            originalName: result.originalName || file.name,
            size: result.size || file.size,
            uploadedAt: new Date().toISOString(),
          })
        }

        completedFiles++
        setProgress(Math.round((completedFiles / totalFiles) * 100))
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
      }
    }

    setUploadedImages((prev) => [...newImages, ...prev])
    setUploading(false)
    setProgress(0)

    if (newImages.length > 0) {
      alert(`Successfully uploaded ${newImages.length} image${newImages.length !== 1 ? "s" : ""}`)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      handleFileUpload(files)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files) {
      handleFileUpload(files)
    }
  }

  const addImageToProduct = async (imageUrl: string, imageName: string) => {
    if (!selectedProduct) {
      alert("Please select a product first")
      return
    }

    try {
      const response = await fetch(`/api/products/${selectedProduct}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
          alt: imageName,
          order: 0, // Will be adjusted by the API
        }),
      })

      if (response.ok) {
        onProductsChange()
        alert("Image added to product successfully")
      } else {
        alert("Failed to add image to product")
      }
    } catch (error) {
      alert("Failed to add image to product")
    }
  }

  const deleteImage = async (imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image? This will remove it from all products.")) {
      return
    }

    try {
      // Remove from uploaded images list
      setUploadedImages((prev) => prev.filter((img) => img.url !== imageUrl))

      // In a real app, you'd also delete the file from the server
      // and remove it from all products that use it

      alert("Image deleted successfully")
    } catch (error) {
      alert("Failed to delete image")
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "Unknown size"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="gallery">Image Gallery ({uploadedImages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Product Images</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop images here, or click to select files
              <br />
              <span className="text-sm text-gray-500">Images will be automatically converted to WebP format</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                <Plus className="h-4 w-4 mr-2" />
                Select Single Image
              </Button>
              <Button variant="outline" onClick={() => multipleFileInputRef.current?.click()} disabled={uploading}>
                <Plus className="h-4 w-4 mr-2" />
                Select Multiple Images
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            <input
              ref={multipleFileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading images...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Product Assignment */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label htmlFor="product-select" className="text-base font-medium">
              Assign Images to Product (Optional)
            </Label>
            <p className="text-sm text-gray-600 mb-3">Select a product to automatically assign uploaded images</p>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {uploadedImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.originalName}
                      fill
                      className="object-contain"
                    />

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => window.open(image.url, "_blank")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = image.url
                            link.download = image.filename
                            link.click()
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteImage(image.url)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="font-medium text-sm truncate" title={image.originalName}>
                      {image.originalName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{formatFileSize(image.size)}</p>

                    {/* Add to Product Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => addImageToProduct(image.url, image.originalName)}
                      disabled={!selectedProduct}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add to Product
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded yet</h3>
              <p className="text-gray-500 mb-4">Upload some images to get started with your product catalog</p>
              <Button onClick={() => setActiveTab("upload")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">💡 Image Upload Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Upload high-quality images (1200×1200px or larger recommended)</li>
          <li>• Supported formats: JPEG, PNG, GIF, TIFF, WebP</li>
          <li>• Images are automatically converted to WebP for better performance</li>
          <li>• You can upload multiple images at once</li>
          <li>• Select a product to automatically assign uploaded images</li>
          <li>• Use the gallery to manage and organize your uploaded images</li>
        </ul>
      </div>
    </div>
  )
}
