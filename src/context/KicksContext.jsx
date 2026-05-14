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

  function addKick(newKick) {
    setKicks(prev => [...prev, { ...newKick, id: Date.now() }])
  }

  return (
    <KicksContext.Provider value={{ kicks, addKick }}>
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
