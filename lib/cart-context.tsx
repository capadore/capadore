"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./types"

export interface CartItem {
  productId: number
  name: string
  price: string
  originalPrice: string
  image: string
  slug: string
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, size?: string, color?: string) => void
  removeItem: (productId: number, size?: string, color?: string) => void
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number, size?: string, color?: string) => {
    setItems((prevItems) => {
      // Check if item already exists in cart with same size and color
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0]?.url || "/placeholder.svg",
            slug: product.slug,
            quantity,
            size,
            color,
          },
        ]
      }
    })

    // Open cart when adding items
    setIsOpen(true)
  }

  const removeItem = (productId: number, size?: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.productId === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: number, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === productId && item.size === size && item.color === color) {
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate total number of items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items
    .reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace(/[£,]/g, ""))
      return total + price * item.quantity
    }, 0)
    .toLocaleString("en-GB", { style: "currency", currency: "GBP" })

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
