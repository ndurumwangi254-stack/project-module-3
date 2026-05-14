import { createContext, useContext, useState } from 'react'
const KicksContext = createContext(null)
const initialKicks = [
  { id: 1, name: 'Nike - Air Max', description: 'Stylish and Comfortable', origin: 'Italy', price: '3.50' },
  { id: 2, name: 'Nike - Air Jordan', description: 'Iconic basketball shoe', origin: 'USA', price: '4.25' },
  { id: 3, name: 'Adidas - Samba', description: 'Classic leather sneaker', origin: 'Colombia', price: '4.75' },
  { id: 4, name: 'Adidas - Ultraboost', description: 'High-performance running shoe', origin: 'Brazil', price: '5.00' }
]
export function KicksProvider({ children }) {
  const [kicks, setKicks] = useState(initialKicks)
  const [cart, setCart] = useState([])

  function addKick(newKick) {
    setKicks(prev => [...prev, { ...newKick, id: Date.now() }])
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
    <KicksContext.Provider value={{ kicks, addKick, cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
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
