"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ArrowLeft, Plus, Minus, ShoppingBag, Check, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [buyingNow, setBuyingNow] = useState(false)

  const { addItem, setIsOpen } = useCart()

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart")
      return
    }

    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined)

    // Show success indicator
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size before purchasing")
      return
    }

    setBuyingNow(true)

    // Add item to cart
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined)

    // Simulate processing
    setTimeout(() => {
      setBuyingNow(false)
      // In a real app, this would redirect to checkout
      alert(
        `Proceeding to checkout with ${quantity} x ${product.name}${selectedSize ? ` (${selectedSize})` : ""}${selectedColor ? ` in ${selectedColor}` : ""}`,
      )

      // Open cart to show the item was added
      setIsOpen(true)
    }, 1500)
  }

  const isOutOfStock = !product.inStock
  const canAddToCart = !isOutOfStock && (product.sizes.length === 0 || selectedSize)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Back</span>
          </Link>

          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-light tracking-[0.2em]">CAPADORE</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]?.url || "/placeholder.svg?height=600&width=450"}
                alt={product.name}
                width={600}
                height={800}
                className="w-full h-full object-contain"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-black" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg?height=150&width=150"}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-light mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">{product.code}</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-medium text-red-600">{product.price}</span>
                <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
                <Badge variant="destructive">Sale</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      disabled={isOutOfStock}
                      className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">
                  Size {!selectedSize && <span className="text-red-500 text-sm">*Required</span>}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`py-3 border rounded-md text-sm transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isOutOfStock || quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={isOutOfStock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Add to Cart & Buy Now */}
            <div className="space-y-3">
              <Button
                className="w-full py-6 text-lg relative"
                disabled={!canAddToCart || addedToCart || buyingNow}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full py-6 text-lg"
                disabled={!canAddToCart || buyingNow || addedToCart}
                onClick={handleBuyNow}
              >
                {buyingNow ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Buy Now
                  </>
                )}
              </Button>

              {/* Size Selection Warning */}
              {product.sizes.length > 0 && !selectedSize && (
                <p className="text-sm text-red-500 text-center">Please select a size to continue</p>
              )}
            </div>

            <Separator />

            {/* Product Details */}
            {product.details.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Product Details</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>• {detail}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-gray-600">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Shipping Information</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Free shipping on orders over £500</li>
                <li>• Standard delivery: 3-5 business days</li>
                <li>• Express delivery: 1-2 business days</li>
                <li>• White glove delivery available for large rugs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}
