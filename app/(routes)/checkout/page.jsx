"use client"
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { UpdateCartContext } from '@/app/_components/_context/UpdateCartContext'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function Checkout() {
  const { cartItems, setCartItems } = useContext(UpdateCartContext)
  const [cart,setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [subTotal,setSubTotal] = useState(0)
  const [deliveryAmount,setDeliveryAmount] = useState(15)
  const [taxAmount,setTaxAmount] = useState(0)
  const [total,setTotal] = useState(0)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [zip,setZip] = useState("")
  const [address,setAddress] = useState("")
  const {user} = useUser()

  useEffect(()=>{
    if(user) getUserCart()
  },[user, cartItems])

  const getUserCart = async () => {
    setLoading(true)
    try{
      const resp = await GlobalApi.getUserCart(user.primaryEmailAddress.emailAddress)
      setCart(resp?.shoppingCarts || [])
      calculateTotals(resp?.shoppingCarts || [])
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  const calculateTotals = (cartArr) => {
    let sub = 0
    cartArr.forEach(item => sub += item.praice)
    const tax = sub * 0.09
    setSubTotal(sub.toFixed(2))
    setTaxAmount(tax.toFixed(2))
    setTotal((sub + tax + deliveryAmount).toFixed(2))
  }

  const createOrder = async () => {
    if(!cart.length){
      toast.error("Your cart is empty!")
      return
    }
    const data = {
      email: user?.primaryEmailAddress.emailAddress,
      orderAmount: total,
      userName: user.fullName,
      address,
      phone,
      zip,
      orderDetails: cart.map(item => ({
        name: item.productName,
        praice: item.praice
      }))
    }
    try{
      const resp = await GlobalApi.createNewOrder(data)
      for(const item of cart){
        await GlobalApi.DeleteFromCart(item.id)
      }
      setCart([])
      setCartItems(prev => prev + 1)
      toast.success("Order Placed Successfully!")
    }catch(err){
      console.error(err)
      toast.error("Failed to place order!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Billing Details */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-orange-100">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">Billing Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input onChange={e => setName(e.target.value)} placeholder="Name" />
            <Input onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input onChange={e => setPhone(e.target.value)} placeholder="Phone" />
            <Input onChange={e => setZip(e.target.value)} placeholder="Zip" />
            <Input className="col-span-2" onChange={e => setAddress(e.target.value)} placeholder="Address" />
            <Button onClick={createOrder} className="col-span-2 bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 py-3 rounded-2xl font-bold text-lg">Place Order</Button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-orange-100">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">Your Orders</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {loading ? (
              <p>Loading cart...</p>
            ) : cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No items in cart.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-orange-50/30 rounded-2xl p-3 hover:bg-orange-100 transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    {item.productImage?.url && (
                      <Image src={item.productImage.url} alt={item.productName || 'Product'} width={60} height={60} className="rounded-xl shadow-sm"/>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{item.productName}</h3>
                      <p className="text-xs text-gray-500">{item.productDescription}</p>
                    </div>
                  </div>
                  <span className="font-bold text-orange-600 text-lg">${item.praice}</span>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-6 border-t border-orange-200 pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Delivery</span>
                <span>${deliveryAmount}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Tax</span>
                <span>${taxAmount}</span>
              </div>
              <div className="flex justify-between text-xl font-extrabold text-orange-600 border-t border-orange-200 pt-3">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Checkout
