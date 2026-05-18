import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useKicksContext } from '../context/KicksContext'

const initialForm = { name: '', origin: '', price: '', description: '', image: '' }

export default function AdminPortal() {
  usePageTitle('Admin Portal')
  const { addKick, kicks } = useKicksContext()
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

    const newKick = {
      ...form,
      image: form.image || 'https://via.placeholder.com/400x400?text=New+Kick'
    }

    
    addKick(newKick)
    setForm(initialForm)
    setMessage('Kick model added successfully.')
    

    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Admin Portal</h2>
        <p className="admin-intro">Add new kick models and manage the current inventory.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Kick Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Air Max" required />
          </label>
          <label>
            Origin
            <input name="origin" value={form.origin} onChange={handleChange} placeholder="Kenya" required />
          </label>
          <label>
            Price (USD)
            <input name="price" value={form.price} onChange={handleChange} placeholder="99.99" required />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} placeholder="Stylish and Comfortable" required />
          </label>
          <label>
            Image URL (optional)
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/photo-..." />
            <small>Leave empty for placeholder image</small>
          </label>
          <button type="submit">Save Kick</button>
          {message && <p className="message success">{message}</p>}
        </form>
      </div>

      <div className="admin-summary">
        <h3>Current Kicks ({kicks.length})</h3>

        <div className="coffee-grid admin-grid">
          {kicks.map(kick => (
            <div key={kick.id} className="coffee-card small-card">
              {}
              <div className="admin-kick-image">
                <img 
                  src={kick.image || 'https://via.placeholder.com/60x60?text=No+Img'} 
                  alt={kick.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/60x60?text=Error';
                  }}
                />
              </div>
              <div className="admin-kick-info">
                <p className="admin-kick-name">{kick.name}</p>
                <span className="admin-kick-origin">{kick.origin}</span>
                <strong className="admin-kick-price">${kick.price}</strong>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}