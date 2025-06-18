"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Search, Menu, User, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"

const scrollingBannerStyles = `
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  @keyframes camera-flash {
    0% {
      background-color: #000000;
      box-shadow: none;
    }
    5% {
      background-color: #ffffff;
      color: #000000;
      box-shadow: 0 0 50px rgba(255, 255, 255, 1), 
                  0 0 100px rgba(255, 255, 255, 0.8),
                  inset 0 0 50px rgba(255, 255, 255, 0.5);
    }
    15% {
      background-color: #000000;
      color: #ffffff;
      box-shadow: none;
    }
    100% {
      background-color: #000000;
      box-shadow: none;
    }
  }
  
  .scrolling-container {
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  
  .scrolling-text {
    display: inline-flex;
    white-space: nowrap;
    animation: scroll-left 20s linear infinite;
    width: fit-content;
  }
  
  .scrolling-text-item {
    padding: 0 20px;
    flex-shrink: 0;
  }
  
  .flashing-banner {
    animation: camera-flash 0.8s linear infinite;
  }
  
  .flashing-banner span {
    transition: color 0.05s linear;
  }
`

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("View all")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const productsPerPage = 8

  const { itemCount, setIsOpen } = useCart()

  const categories = [
    "View all",
    "Persian Rugs",
    "Afghan Rugs",
    "Traditional Rugs",
    "Modern Rugs",
    "Medallion Rugs",
    "Floral Rugs",
    "Luxury Rugs",
    "Premium Rugs",
    "Handmade Rugs",
    "Persian Prayer Rugs",
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort products based on selected category, search query, and sort option
  const getFilteredAndSortedProducts = () => {
    let filtered = products

    // Apply search filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        const name = product.name.toLowerCase()
        const description = product.description.toLowerCase()
        const code = product.code.toLowerCase()
        const category = product.category.toLowerCase()
        const details = product.details.join(" ").toLowerCase()

        return (
          name.includes(query) ||
          description.includes(query) ||
          code.includes(query) ||
          category.includes(query) ||
          details.includes(query)
        )
      })
    }

    // Apply category filter
    if (selectedCategory !== "View all") {
      filtered = filtered.filter((product) => {
        const name = product.name.toLowerCase()
        const description = product.description.toLowerCase()
        const category = selectedCategory.toLowerCase()

        switch (category) {
          case "persian rugs":
            return name.includes("persian") || description.includes("persian")
          case "afghan rugs":
            return name.includes("afghan") || description.includes("afghan")
          case "traditional rugs":
            return (
              name.includes("traditional") ||
              description.includes("traditional") ||
              name.includes("classic") ||
              description.includes("classic")
            )
          case "modern rugs":
            return (
              name.includes("modern") ||
              description.includes("contemporary") ||
              name.includes("silver") ||
              name.includes("black pattern") ||
              name.includes("navy pattern")
            )
          case "medallion rugs":
            return name.includes("medallion") || description.includes("medallion")
          case "floral rugs":
            return name.includes("floral") || description.includes("floral") || description.includes("botanical")
          case "luxury rugs":
            return (
              name.includes("luxury") ||
              name.includes("royal") ||
              name.includes("imperial") ||
              description.includes("luxury") ||
              description.includes("opulent")
            )
          case "premium rugs":
            return (
              description.includes("premium") ||
              description.includes("silk") ||
              description.includes("museum quality") ||
              description.includes("heirloom")
            )
          case "handmade rugs":
            return (
              description.includes("hand-knotted") ||
              description.includes("handmade") ||
              description.includes("hand-woven") ||
              description.includes("handcrafted") ||
              (product.details &&
                product.details.some(
                  (detail) =>
                    detail.toLowerCase().includes("hand-knotted") ||
                    detail.toLowerCase().includes("handmade") ||
                    detail.toLowerCase().includes("hand-woven") ||
                    detail.toLowerCase().includes("handcrafted"),
                ))
            )
          case "persian prayer rugs":
            return (
              name.includes("prayer") ||
              description.includes("prayer") ||
              description.includes("mihrab") ||
              category.toLowerCase().includes("prayer")
            )
          default:
            return true
        }
      })
    }

    // Sort products
    if (sortBy === "price-low-high") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = Number.parseFloat(a.price.replace(/[£,]/g, ""))
        const priceB = Number.parseFloat(b.price.replace(/[£,]/g, ""))
        return priceA - priceB
      })
    } else if (sortBy === "price-high-low") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = Number.parseFloat(a.price.replace(/[£,]/g, ""))
        const priceB = Number.parseFloat(b.price.replace(/[£,]/g, ""))
        return priceB - priceA
      })
    }
    // For "relevance", keep the original order (featured products first, then by creation date)

    return filtered
  }

  const filteredProducts = getFilteredAndSortedProducts()

  // Calculate pagination based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  // Reset to page 1 and relevance sorting when category changes
  useEffect(() => {
    setSortBy("relevance")
  }, [selectedCategory])

  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setSearchQuery("")
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the effect above
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearch(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // Create an array of separate sale text items
  const saleMessages = ["SALE UP TO 40%", "FREE SHIPPING", "WORLDWIDE"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-light tracking-[0.2em]">CAPADORE</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-gray-200 px-4 py-3 max-w-7xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search rugs by name, style, material, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button type="submit" variant="outline">
                Search
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Sale Banner */}
      <div className="bg-black text-white py-2 overflow-hidden relative flashing-banner">
        <style dangerouslySetInnerHTML={{ __html: scrollingBannerStyles }} />
        <div className="scrolling-container">
          <div className="scrolling-text">
            {/* First set of items */}
            {Array(5)
              .fill(null)
              .map((_, groupIndex) => (
                <React.Fragment key={`group-1-${groupIndex}`}>
                  {saleMessages.map((message, index) => (
                    <div
                      key={`text-1-${groupIndex}-${index}`}
                      className="scrolling-text-item text-sm font-medium tracking-wider"
                    >
                      {message}
                    </div>
                  ))}
                </React.Fragment>
              ))}

            {/* Duplicate set for seamless looping */}
            {Array(5)
              .fill(null)
              .map((_, groupIndex) => (
                <React.Fragment key={`group-2-${groupIndex}`}>
                  {saleMessages.map((message, index) => (
                    <div
                      key={`text-2-${groupIndex}-${index}`}
                      className="scrolling-text-item text-sm font-medium tracking-wider"
                    >
                      {message}
                    </div>
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center px-4 max-w-7xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors hover:text-gray-900 ${
                selectedCategory === category ? "text-black border-b-2 border-black" : "text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}{" "}
                products
                {selectedCategory !== "View all" && <span className="ml-2 text-gray-500">in {selectedCategory}</span>}
                {searchQuery && <span className="ml-2 text-gray-500">for "{searchQuery}"</span>}
              </p>
              {(selectedCategory !== "View all" || searchQuery) && (
                <div className="flex items-center gap-2">
                  {selectedCategory !== "View all" && (
                    <Button variant="outline" size="sm" onClick={() => setSelectedCategory("View all")}>
                      Clear Category
                    </Button>
                  )}
                  {searchQuery && (
                    <Button variant="outline" size="sm" onClick={clearSearch}>
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[0]?.url || "/placeholder.svg?height=400&width=300"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.code}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-600">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State for Search Results */}
        {filteredProducts.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No rugs found for "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords or browse our categories</p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
              <Button variant="outline" onClick={() => setSelectedCategory("View all")}>
                View All Rugs
              </Button>
            </div>
          </div>
        )}

        {/* Empty State for Filtered Results */}
        {filteredProducts.length === 0 && selectedCategory !== "View all" && !searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in {selectedCategory}</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
            <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory("View all")}>
              View All Products
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new arrivals</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Black Fade Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,0) 25%)",
        }}
      />
    </div>
  )
}
