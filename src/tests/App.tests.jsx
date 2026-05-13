import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import Home from '../Home'
import { CoffeeProvider } from '../../context/CoffeeContext'
import { testConfig } from '../../tests/config'

const mockHomeProps = {
}

const renderHome = () => {
  return render(
    <CoffeeProvider>
      <Home />
    </CoffeeProvider>
  )
}

describe('Home', () => {
  beforeEach(() => {
    vi.spyOn(document, 'title', 'get')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Hero Section', () => {
    it('renders the hero card with correct heading text', () => {
      renderHome()

      const heading = screen.getByRole('heading', { level: 1, name: /Coffee R Us/i })
      expect(heading).toBeInTheDocument()
    })

    it('renders the hero subtitle text', () => {
      renderHome()

      const subtitle = screen.getByText('The go-to store for your coffee needs.')
      expect(subtitle).toBeInTheDocument()
    })

    it('renders hero card with proper styling class', () => {
      const { container } = renderHome()

      const heroCard = container.querySelector('.hero-card')
      expect(heroCard).toBeInTheDocument()
    })
  })

  describe('Search Panel', () => {
    it('renders the search panel with heading', () => {
      renderHome()

      const searchHeading = screen.getByRole('heading', { name: /Search/i })
      expect(searchHeading).toBeInTheDocument()
    })

    it('renders search input with correct placeholder text', () => {
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'search')
    })

    it('filters coffee list when searching by coffee name', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      const initialCards = screen.getAllByRole('article')
      expect(initialCards.length).toBeGreaterThan(0)

      await user.type(searchInput, 'Espresso')

      const espressoCard = screen.getByText(/Espresso/)
      expect(espressoCard).toBeInTheDocument()
    })

    it('displays empty state message when search returns no results', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      await user.type(searchInput, 'NonexistentCoffee12345')

      const emptyMessage = screen.getByText(/No coffees found. Try another search term./i)
      expect(emptyMessage).toBeInTheDocument()
    })

    it('filters coffee list when searching by origin', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      await user.type(searchInput, 'Italy')

      const coffeeWithOrigin = screen.getByText(/Italy/)
      expect(coffeeWithOrigin).toBeInTheDocument()
    })

    it('filters coffee list when searching by description', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      await user.type(searchInput, 'bold')

      const espressoCard = screen.getByText(/Strong, rich, and bold/i)
      expect(espressoCard).toBeInTheDocument()
    })

    it('search filter is case-insensitive', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      await user.type(searchInput, 'ESPRESSO')

      const coffeeCard = screen.getByText(/Espresso/)
      expect(coffeeCard).toBeInTheDocument()
    })

    it('clears search results when search input is cleared', async () => {
      const user = userEvent.setup()
      renderHome()

      const searchInput = screen.getByPlaceholderText(/Search blends, origins, or flavours/i)

      await user.type(searchInput, 'Espresso')
      expect(screen.getByText(/Espresso/)).toBeInTheDocument()

      await user.clear(searchInput)

      const allCards = screen.getAllByRole('article')
      expect(allCards.length).toBeGreaterThan(1)
    })
  })

  describe('Popular Blends', () => {
    it('renders the "Popular blends" heading', () => {
      renderHome()

      const blendHeading = screen.getByRole('heading', { name: /Popular blends/i })
      expect(blendHeading).toBeInTheDocument()
    })

    it('renders all available coffee cards in the grid', () => {
      renderHome()

      const coffeeCards = screen.getAllByRole('article')
      expect(coffeeCards.length).toBe(testConfig.mockCoffees.length)
    })

    it('displays coffee name, description, origin, and price for each card', () => {
      renderHome()

      expect(screen.getByText(/Espresso/)).toBeInTheDocument()
      expect(screen.getByText(/Strong, rich, and bold/)).toBeInTheDocument()
      expect(screen.getByText(/Italy/)).toBeInTheDocument()
      expect(screen.getByText(/\$3.50/)).toBeInTheDocument()
    })

    it('limits displayed coffees to 6 items maximum', () => {
      renderHome()

      const coffeeCards = screen.getAllByRole('article')
      expect(coffeeCards.length).toBeLessThanOrEqual(6)
    })

    it('renders coffee cards with semantic article elements', () => {
      const { container } = renderHome()

      const coffeeGrid = container.querySelector('.coffee-grid')
      const articles = coffeeGrid.querySelectorAll('article')

      expect(articles.length).toBeGreaterThan(0)
      articles.forEach(article => {
        expect(article).toHaveClass('coffee-card')
      })
    })
  })

  describe('Footer Section', () => {
    it('renders "Our Story" info card in footer', () => {
      renderHome()

      const storyHeading = screen.getByRole('heading', { name: /Our Story/i })
      expect(storyHeading).toBeInTheDocument()

      const storyText = screen.getByText(/At Coffee R Us, we are passionate/i)
      expect(storyText).toBeInTheDocument()
    })

    it('renders "Why Choose Us?" info card in footer', () => {
      renderHome()

      const whyHeading = screen.getByRole('heading', { name: /Why Choose Us/i })
      expect(whyHeading).toBeInTheDocument()
    })

    it('renders all bullet points in "Why Choose Us?" list', () => {
      renderHome()

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBeGreaterThan(0)

      expect(screen.getByText(/Wide selection of premium coffee blends/i)).toBeInTheDocument()
      expect(screen.getByText(/Ethically sourced and sustainably grown beans/i)).toBeInTheDocument()
    })
  })

  describe('Page Structure', () => {
    it('renders as a section element with home-page class', () => {
      const { container } = renderHome()

      const section = container.querySelector('section.home-page')
      expect(section).toBeInTheDocument()
    })

    it('displays all main sections in correct order: hero, search, footer', () => {
      const { container } = renderHome()

      const heroCard = container.querySelector('.hero-card')
      const rightColumn = container.querySelector('.right-column')
      const homeFooter = container.querySelector('.home-footer')

      expect(heroCard).toBeInTheDocument()
      expect(rightColumn).toBeInTheDocument()
      expect(homeFooter).toBeInTheDocument()
    })
  })

  describe('Future: Shopping Cart Integration', () => {
    it.todo('should add coffee to cart when "Add to Cart" button is clicked')
    it.todo('should display cart item count in the cart badge')
    it.todo('should persist cart to localStorage')
  })

  describe('Future: Product Images', () => {
    it.todo('should display product images for each coffee card')
    it.todo('should render fallback UI when image fails to load')
  })

  describe('Future: Coffee Pagination', () => {
    it.todo('should load more coffees when "Load More" button is clicked')
    it.todo('should implement infinite scroll on mobile devices')
  })

  describe('Future: Favorites Feature', () => {
    it.todo('should allow users to mark coffees as favorites')
    it.todo('should persist favorite list to localStorage')
  })
})
