import usePageTitle from '../hooks/usePageTitle'
import { useKicksContext } from '../context/KicksContext'

export default function Shop() {
  usePageTitle('Shop')
  const { kicks } = useKicksContext()

  return (
    <section className="shop-page">
      <div className="section-card">
        <h2>Shop our kick models</h2>
        <p>Discover authentic, stylish footwear from around the world.</p>
      </div>
      <div className="coffee-grid shop-grid">
        {kicks.map(kick => (
          <article key={kick.id} className="coffee-card">
            <h3>{kick.name}</h3>
            <p>{kick.description}</p>
            <span>{kick.origin}</span>
            <strong>${kick.price}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
