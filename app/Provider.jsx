"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import { UpdateCartContext } from './_components/_context/UpdateCartContext'

function Provider({ children }) {
  // ✅ cartItems ديما array
  const [cartItems, setCartItems] = useState([])

  // ✅ دالة لإضافة عنصر للسلة
  const addToCart = (item) => {
    setCartItems(prev => [...prev, item])
  }

  // ✅ دالة لإزالة عنصر من السلة
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <UpdateCartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      <Header />
      {children}
    </UpdateCartContext.Provider>
  )
}

export default Provider
