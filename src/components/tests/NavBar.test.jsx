import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import Navbar from '../NavBar'

const expectedNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/admin', label: 'Admin Portal' },
]

const renderNavbar = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  )
}

describe('NavBar', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('renders the brand name "Coffee R Us"', () => {
    renderNavbar()

    const brandElement = screen.getByText('Coffee R Us')
    expect(brandElement).toBeInTheDocument()
    expect(brandElement).toHaveClass('brand')
  })

  it('renders all three navigation links with correct labels', () => {
    renderNavbar()

    expectedNavLinks.forEach(link => {
      const navLink = screen.getByRole('link', { name: link.label })
      expect(navLink).toBeInTheDocument()
      expect(navLink).toHaveAttribute('href', link.to)
    })
  })

  it('applies active class to the Home link when on the home route', () => {
    renderNavbar('/')

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveClass('active')
  })

  it('applies active class to the Shop link when on the shop route', () => {
    renderNavbar('/shop')

    const shopLink = screen.getByRole('link', { name: 'Shop' })
    expect(shopLink).toHaveClass('active')
  })

  it('applies active class to the Admin Portal link when on the admin route', () => {
    renderNavbar('/admin')

    const adminLink = screen.getByRole('link', { name: 'Admin Portal' })
    expect(adminLink).toHaveClass('active')
  })

  it('does not apply active class to non-current route links', () => {
    renderNavbar('/')

    const shopLink = screen.getByRole('link', { name: 'Shop' })
    const adminLink = screen.getByRole('link', { name: 'Admin Portal' })

    expect(shopLink).not.toHaveClass('active')
    expect(adminLink).not.toHaveClass('active')
  })

  it('renders the navbar with proper semantic structure', () => {
    renderNavbar()

    const navElement = screen.getByRole('navigation')
    expect(navElement).toBeInTheDocument()
    expect(navElement).toHaveClass('navbar')
  })

  it('organizes nav links in a container with nav-links class', () => {
    const { container } = renderNavbar()

    const navLinksContainer = container.querySelector('.nav-links')
    expect(navLinksContainer).toBeInTheDocument()

    const linksInContainer = navLinksContainer.querySelectorAll('a')
    expect(linksInContainer).toHaveLength(3)
  })

  describe('Future: Submenu Navigation', () => {
    it.todo('should display dropdown menus for category filters on hover')
  })

  describe('Future: Mobile Navigation', () => {
    it.todo('should render hamburger menu on mobile viewports')
    it.todo('should toggle mobile menu open/closed on hamburger click')
  })

  describe('Future: User Authentication', () => {
    it.todo('should display login/logout links based on auth state')
    it.todo('should show user profile menu when logged in')
  })
})
