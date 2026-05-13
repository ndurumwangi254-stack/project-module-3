import usePageTitle from '../hooks/usePageTitle'
import { useCoffeeContext } from '../context/CoffeeContext'

export default function Shop() {
  usePageTitle('Shop')
  const { coffees } = useCoffeeContext()

  return (
    <section className="shop-page">
      <div className="section-card">
        <h2>Shop our coffee menu</h2>
        <p>Discover fresh, roasted blends from around the world.</p>
      </div>
      <div className="coffee-grid shop-grid">
        {coffees.map(coffee => (
          <article key={coffee.id} className="coffee-card">
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <span>{coffee.origin}</span>
            <strong>${coffee.price}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
