"use client"

import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, isOpen, setIsOpen, itemCount } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      alert(`Proceeding to checkout with ${itemCount} item${itemCount !== 1 ? "s" : ""} totaling ${subtotal}`)
      // In a real app, this would redirect to the checkout page
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="font-medium">Shopping Cart ({itemCount})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any rugs to your cart yet.</p>
              <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4 px-6">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className="flex gap-4">
                  <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-medium text-sm hover:underline line-clamp-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                    {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.price}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-medium">{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Shipping</span>
              <span className="text-sm">Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">{subtotal}</span>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
