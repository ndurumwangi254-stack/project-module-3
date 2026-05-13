import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { useCoffeeContext } from '../context/CoffeeContext'

export default function Home() {
  usePageTitle('Home')
  const { coffees } = useCoffeeContext()
  const [search, setSearch] = useState('')

  const filteredCoffees = coffees.filter(coffee => {
    const term = search.toLowerCase()
    return (
      coffee.name.toLowerCase().includes(term) ||
      coffee.description.toLowerCase().includes(term) ||
      coffee.origin.toLowerCase().includes(term)
    )
  })

  return (
    <section className="home-page">
      <div className="hero-card">
        <h1>Coffee R Us</h1>
        <p>The go-to store for your coffee needs.</p>
      </div>

      <div className="right-column">
        <div className="search-panel">
          <h2>Search</h2>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blends, origins, or flavours"
          />
        </div>

        <div className="featured">
          <h2>Popular blends</h2>
          <div className="coffee-grid">
            {filteredCoffees.length > 0 ? (
              filteredCoffees.slice(0, 6).map(coffee => (
                <article key={coffee.id} className="coffee-card">
                  <h3>{coffee.name}</h3>
                  <p>{coffee.description}</p>
                  <span>{coffee.origin}</span>
                  <strong>${coffee.price}</strong>
                </article>
              ))
            ) : (
              <p className="empty-state">No coffees found. Try another search term.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <div className="info-card">
          <h2>Our Story</h2>
          <p>
            At Coffee R Us, we are passionate about bringing you the finest coffee blends from around the world. Our journey began with a simple love for coffee and a desire to share that love with others. We source our beans from sustainable farms, ensuring that every cup you enjoy supports ethical practices and quality craftsmanship.
          </p>
        </div>

        <div className="info-card">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Wide selection of premium coffee blends</li>
            <li>Ethically sourced and sustainably grown beans</li>
            <li>Expertly roasted for maximum flavor</li>
            <li>Exceptional customer service and support</li>
          </ul>
        </div>
      </footer>
    </section>
  )
}
