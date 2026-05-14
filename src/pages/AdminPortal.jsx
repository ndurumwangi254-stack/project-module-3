import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useKicksContext } from '../context/KicksContext'

const initialForm = { name: '', origin: '', price: '', description: '' }

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
    addKick(form)
    setForm(initialForm)
    setMessage('Kick model added successfully.')
  }

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Admin Portal</h2>
        <p className="admin-intro">Add new kick models and manage the current inventory.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Kick Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Air Max" />
          </label>
          <label>
            Origin
            <input name="origin" value={form.origin} onChange={handleChange} placeholder="Kenya" />
          </label>
          <label>
            Price
            <input name="price" value={form.price} onChange={handleChange} placeholder="3000Ksh" />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} placeholder="Stylish and Comfortable" />
          </label>
          <button type="submit">Save</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <div className="admin-summary">
        <h3>Current Kicks</h3>
        <div className="coffee-grid admin-grid">
          {kicks.map(kick => (
            <div key={kick.id} className="coffee-card small-card">
              <p>{kick.name}</p>
              <span>{kick.origin}</span>
              <strong>${kick.price}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
