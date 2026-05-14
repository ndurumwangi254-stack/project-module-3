import usePageTitle from '../hooks/usePageTitle'
import { useKicksContext } from '../context/KicksContext'
import { useState } from 'react'

export default function Shop() {
  usePageTitle('Shop')
  const { kicks, addToCart, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useKicksContext()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <section className="shop-page">
      <div className="section-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Shop our kick models</h2>
          <p>Discover authentic, stylish footwear from around the world.</p>
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
          🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div className="kicks-grid shop-grid" style={{ flex: 1 }}>
          {kicks.map(kick => (
            <article key={kick.id} className="kicks-card">
              <h3>{kick.name}</h3>
              <p>{kick.description}</p>
              <span>{kick.origin}</span>
              <strong>${kick.price}</strong>
              <button className="add-to-cart-btn" onClick={() => addToCart(kick)}>
                Add to Cart
              </button>
            </article>
          ))}
        </div>

        {cartOpen && (
          <div className="cart-sidebar">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: ${cartTotal.toFixed(2)}</strong>
                </div>
                <button className="checkout-btn">Checkout</button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
