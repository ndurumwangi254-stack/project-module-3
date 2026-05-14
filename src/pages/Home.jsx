import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useKicksContext } from '../context/KicksContext'

export default function Home() {
  usePageTitle('Home')
  const { kicks } = useKicksContext()
  const [search, setSearch] = useState('')

  const filteredKicks = kicks.filter(kick => {
    const term = search.toLowerCase()
    return (
      kick.name.toLowerCase().includes(term) ||
      kick.description.toLowerCase().includes(term) ||
      kick.origin.toLowerCase().includes(term)
    )
  })

  return (
    <section className="home-page">
      <div className="hero-card">
        <h1>Real Kicks Kenya</h1>
        <p>The go-to store for your kick needs.</p>
      </div>

      <div className="right-column">
        <div className="search-panel">
          <h2>Search</h2>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search kicks, origins, or styles..."
          />
        </div>

        <div className="featured">
          <h2>Popular Kicks</h2>
          <div className="coffee-grid">
            {filteredKicks.length > 0 ? (
              filteredKicks.slice(0, 6).map(kick => (
                <article key={kick.id} className="coffee-card">
                  <h3>{kick.name}</h3>
                  <p>{kick.description}</p>
                  <span>{kick.origin}</span>
                  <strong>${kick.price}</strong>
                </article>
              ))
            ) : (
              <p className="empty-state">No kicks found. Try another search term.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <div className="info-card">
          <h2>Our Story</h2>
          <p>
            At Real Kicks Kenya, we are passionate about bringing you the finest sneaker models from around the world. Our journey began with a simple love for kicks and a desire to share that love with others. We source our products from sustainable suppliers, ensuring that every pair you purchase supports ethical practices and quality craftsmanship.
          </p>
        </div>

        <div className="info-card">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Wide selection of premium shoe models</li>
            <li>Ethically sourced and sustainably produced</li>
            <li>Expertly designed for maximum comfort</li>
            <li>Exceptional customer service and support</li>
          </ul>
        </div>
      </footer>
    </section>
  )
}
