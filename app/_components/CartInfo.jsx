"use client"
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { UpdateCartContext } from './_context/UpdateCartContext'
import { toast } from 'sonner'
import Link from 'next/link'

function CartInfo({ cart }) {
  const { setCartItems } = useContext(UpdateCartContext)

  const totalAmount = () => {
    return cart?.reduce((sum, item) => sum + (item?.praice || 0), 0)
  }

  const handleRemoveFromCart = async (id) => {
    try {
      await GlobalApi.DeleteFromCart(id)
      setCartItems(prev => !prev)
      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Error removing item:", error)
      toast.error("Failed to remove item!")
    }
  }

  return (
    <div className="w-full sm:w-80 max-w-sm p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-100 space-y-4 mx-auto">
      {cart?.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
      ) : (
        cart.map((item, inx) => (
          <div
            key={inx}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-orange-50/40 rounded-xl p-3 hover:bg-orange-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3 flex-1 mb-2 sm:mb-0">
              {item?.productImage?.url && (
                <Image
                  className="rounded-xl w-14 h-14 shadow-sm object-cover transform hover:scale-105 transition-transform duration-300"
                  src={item.productImage.url}
                  width={56}
                  height={56}
                  alt={item.productName || 'Product'}
                />
              )}
              <h2 className="font-semibold text-sm sm:text-base text-gray-800">{item?.productName}</h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="font-bold text-sm sm:text-base text-orange-600">${item?.praice}</span>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="p-1 hover:bg-red-100 rounded-full transition-colors duration-300"
              >
                <X className="cursor-pointer text-red-500 h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      )}

      {cart?.length > 0 && (
        <div className="mt-3 border-t border-orange-200 pt-3">
          <div className="flex justify-between mb-3 text-sm sm:text-base">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="font-bold text-lg text-orange-600">${totalAmount()}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold py-2 rounded-xl transition-all duration-300">
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartInfo
