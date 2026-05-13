import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useCoffeeContext } from '../context/CoffeeContext'

const initialForm = { name: '', origin: '', price: '', description: '' }

export default function AdminPortal() {
  usePageTitle('Admin Portal')
  const { addCoffee, coffees } = useCoffeeContext()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.origin || !form.price || !form.description) {
      setMessage('Please fill in every field.')
      return
    }
    addCoffee(form)
    setForm(initialForm)
    setMessage('Coffee blend added successfully.')
  }

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Admin Portal</h2>
        <p className="admin-intro">Add new coffee blends and manage the current menu.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Coffee Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Espresso" />
          </label>
          <label>
            Origin
            <input name="origin" value={form.origin} onChange={handleChange} placeholder="Kenya" />
          </label>
          <label>
            Price
            <input name="price" value={form.price} onChange={handleChange} placeholder="4.99" />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} placeholder="Smooth and sweet" />
          </label>
          <button type="submit">Save</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <div className="admin-summary">
        <h3>Current roasts</h3>
        <div className="coffee-grid admin-grid">
          {coffees.map(coffee => (
            <div key={coffee.id} className="coffee-card small-card">
              <p>{coffee.name}</p>
              <span>{coffee.origin}</span>
              <strong>${coffee.price}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
