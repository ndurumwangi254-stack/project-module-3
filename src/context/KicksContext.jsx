import { createContext, useContext, useState, useEffect } from 'react'

const KicksContext = createContext(null)

const API = 'http://localhost:3001/kicks'

export function KicksProvider({ children }) {
  const [kicks, setKicks] = useState([])
  const [cart, setCart] = useState([])

  // Fetch kicks on load
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setKicks(data))
  }, [])

  function addKick(newKick) {
    const kickWithImage = {
      ...newKick,
      image: newKick.image || 'https://via.placeholder.com/400x400?text=New+Kick'
    }
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(kickWithImage)
    })
      .then(res => res.json())
      .then(saved => setKicks(prev => [...prev, saved]))
  }

  function addToCart(kick) {
    setCart(prev => {
      const existing = prev.find(item => item.id === kick.id)
      if (existing) {
        return prev.map(item =>
          item.id === kick.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...kick, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return removeFromCart(id)
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <KicksContext.Provider value={{
      kicks,
      addKick,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount
    }}>
      {children}
    </KicksContext.Provider>
  )
}

export function useKicksContext() {
  const context = useContext(KicksContext)
  if (!context) {
    throw new Error('useKicksContext must be used inside KicksProvider')
  }
  return context
}