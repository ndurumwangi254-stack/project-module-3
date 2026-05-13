import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/admin', label: 'Admin Portal' }
]

export default function Navbar() {    
  return (
    <nav className="navbar">
      <div className="brand">Coffee R Us</div>
      <div className="nav-links">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
