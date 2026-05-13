import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import Shop from '../Shop'
import { CoffeeProvider } from '../../context/CoffeeContext'
import { testConfig } from '../../tests/config'

const renderShop = () => {
  return render(
    <CoffeeProvider>
      <Shop />
    </CoffeeProvider>
  )
}

describe('Shop', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Shop Header Section', () => {
    it('renders the "Shop our coffee menu" heading', () => {
      renderShop()

      const heading = screen.getByRole('heading', { level: 2, name: /Shop our coffee menu/i })
      expect(heading).toBeInTheDocument()
    })

    it('renders the shop description text', () => {
      renderShop()

      const description = screen.getByText(/Discover fresh, roasted blends from around the world./i)
      expect(description).toBeInTheDocument()
    })

    it('renders section card with proper styling class', () => {
      const { container } = renderShop()

      const sectionCard = container.querySelector('.section-card')
      expect(sectionCard).toBeInTheDocument()
    })
  })

  describe('Coffee Grid Display', () => {
    it('renders all available coffee products in the grid', () => {
      renderShop()

      const coffeeCards = screen.getAllByRole('article')
      expect(coffeeCards.length).toBe(testConfig.mockCoffees.length)
    })

    it('displays coffee name in each card', () => {
      renderShop()

      testConfig.mockCoffees.forEach(coffee => {
        const coffeeNameElement = screen.getByText(coffee.name)
        expect(coffeeNameElement).toBeInTheDocument()
      })
    })

    it('displays coffee description in each card', () => {
      renderShop()

      testConfig.mockCoffees.forEach(coffee => {
        const descriptionElement = screen.getByText(coffee.description)
        expect(descriptionElement).toBeInTheDocument()
      })
    })

    it('displays coffee origin in each card', () => {
      renderShop()

      testConfig.mockCoffees.forEach(coffee => {
        const originElement = screen.getByText(coffee.origin)
        expect(originElement).toBeInTheDocument()
      })
    })

    it('displays coffee price in each card with dollar sign', () => {
      renderShop()

      testConfig.mockCoffees.forEach(coffee => {
        const pricePattern = new RegExp(`\\$${coffee.price}`)
        const priceElement = screen.getByText(pricePattern)
        expect(priceElement).toBeInTheDocument()
      })
    })

    it('renders coffee cards with semantic article elements', () => {
      const { container } = renderShop()

      const coffeeGrid = container.querySelector('.coffee-grid.shop-grid')
      expect(coffeeGrid).toBeInTheDocument()

      const articles = coffeeGrid.querySelectorAll('article.coffee-card')
      expect(articles.length).toBe(testConfig.mockCoffees.length)
    })

    it('applies shop-grid class for 3-column layout', () => {
      const { container } = renderShop()

      const shopGrid = container.querySelector('.shop-grid')
      expect(shopGrid).toBeInTheDocument()
      expect(shopGrid).toHaveClass('coffee-grid')
      expect(shopGrid).toHaveClass('shop-grid')
    })
  })

  describe('Page Structure', () => {
    it('renders as a section element with shop-page class', () => {
      const { container } = renderShop()

      const section = container.querySelector('section.shop-page')
      expect(section).toBeInTheDocument()
    })

    it('contains proper semantic structure: header then grid', () => {
      const { container } = renderShop()

      const shopPage = container.querySelector('.shop-page')
      const children = shopPage.children

      expect(children[0]).toHaveClass('section-card')

      expect(children[1]).toHaveClass('coffee-grid')
    })
  })

  describe('Individual Coffee Card Content', () => {
    it('displays all required information for Espresso card', () => {
      renderShop()

      const espressoName = screen.getByText('Espresso')
      const espressoCard = espressoName.closest('article')

      expect(within(espressoCard).getByText('Espresso')).toBeInTheDocument()
      expect(within(espressoCard).getByText('Strong, rich, and bold')).toBeInTheDocument()
      expect(within(espressoCard).getByText('Italy')).toBeInTheDocument()
      expect(within(espressoCard).getByText(/\$3.50/)).toBeInTheDocument()
    })

    it('displays all required information for Cappuccino card', () => {
      renderShop()

      const cappuccinoName = screen.getByText('Cappuccino')
      const cappuccinoCard = cappuccinoName.closest('article')

      expect(within(cappuccinoCard).getByText('Cappuccino')).toBeInTheDocument()
      expect(within(cappuccinoCard).getByText('Creamy foam with espresso')).toBeInTheDocument()
      expect(within(cappuccinoCard).getByText('Ethiopia')).toBeInTheDocument()
      expect(within(cappuccinoCard).getByText(/\$4.25/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('uses semantic article elements for coffee cards', () => {
      const { container } = renderShop()

      const articles = container.querySelectorAll('article.coffee-card')
      expect(articles.length).toBeGreaterThan(0)

      articles.forEach(article => {
        const headings = article.querySelectorAll('h3')
        expect(headings.length).toBeGreaterThan(0)
      })
    })

    it('renders headings in proper semantic order', () => {
      renderShop()

      const h2Headings = screen.getAllByRole('heading', { level: 2 })
      const h3Headings = screen.getAllByRole('heading', { level: 3 })

      expect(h2Headings.length).toBeGreaterThan(0)
      expect(h3Headings.length).toBeGreaterThan(0)
    })
  })

  describe('Future: Product Images', () => {
    it.todo('should render product image for each coffee')
    it.todo('should display broken image fallback when image src fails')
    it.todo('should have descriptive alt text for each image')
  })

  describe('Future: Shopping Cart Integration', () => {
    it.todo('should display "Add to Cart" button on each coffee card')
    it.todo('should show quantity selector for adding multiple items')
    it.todo('should add coffee to cart when button is clicked')
    it.todo('should show confirmation message after adding to cart')
  })

  describe('Future: Product Filtering and Sorting', () => {
    it.todo('should filter products by origin')
    it.todo('should filter products by price range')
    it.todo('should sort products by name (A-Z)')
    it.todo('should sort products by price (low to high)')
    it.todo('should sort products by newest added')
  })

  describe('Future: Product Details Modal', () => {
    it.todo('should open modal with full product information when card is clicked')
    it.todo('should display larger product image in modal')
    it.todo('should show detailed tasting notes and brewing instructions')
  })

  describe('Future: Product Reviews', () => {
    it.todo('should display average rating for each product')
    it.todo('should show number of reviews for each product')
    it.todo('should allow users to submit their own review')
  })
})
