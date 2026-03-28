'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  handle: string
  price: number
  quantity: number
  color?: string
  size?: string
  image: string
}

export interface Order {
  id: string
  date: string
  status: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
}

interface GlobalContextType {
  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, color?: string, size?: string) => void
  updateCartQuantity: (id: string, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  cartSubtotal: number
  cartCount: number

  // Wishlist
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean

  // Auth/User
  user: User | null
  login: (userData: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void

  // Orders
  orders: Order[]
  addOrder: (order: Order) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('malak_cart')
    const savedWishlist = localStorage.getItem('malak_wishlist')
    const savedUser = localStorage.getItem('malak_user')
    const savedOrders = localStorage.getItem('malak_orders')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
    
    setIsLoaded(true)
  }, [])

  // Update LocalStorage on changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('malak_cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('malak_wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('malak_user', JSON.stringify(user))
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('malak_orders', JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  // Cart logic
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      )

      if (existingItemIndex > -1) {
        const newCart = [...prev]
        newCart[existingItemIndex].quantity += item.quantity
        return newCart
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string, color?: string, size?: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.color === color && i.size === size)))
  }

  const updateCartQuantity = (id: string, quantity: number, color?: string, size?: string) => {
    setCart((prev) => {
      const newCart = [...prev]
      const index = newCart.findIndex((i) => i.id === id && i.color === color && i.size === size)
      if (index > -1) {
        newCart[index].quantity = quantity
      }
      return newCart
    })
  }

  const clearCart = () => setCart([])

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Wishlist logic
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const isInWishlist = (productId: string) => wishlist.includes(productId)

  // Auth logic
  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  // Orders logic
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
  }

  return (
    <GlobalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        logout,
        updateUser,
        orders,
        addOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
