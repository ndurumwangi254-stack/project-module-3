import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import Shop from '../Shop'
import { REAL KICKS KENYAProvider } from '../../context/REAL KICKS KENYAContext'
import { testConfig } from '../../tests/config'

const renderShop = () => {
  return render(
    <REAL KICKS KENYAProvider>
      <Shop />
    </REAL KICKS KENYAProvider>
  )
}

describe('Shop', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Shop Header Section', () => {
    it('renders the "Shop our REAL KICKS KENYA menu" heading', () => {
      renderShop()

      const heading = screen.getByRole('heading', { level: 2, name: /Shop our REAL KICKS KENYA menu/i })
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

  describe('REAL KICKS KENYA Grid Display', () => {
    it('renders all available REAL KICKS KENYA products in the grid', () => {
      renderShop()

      const REAL KICKS KENYACards = screen.getAllByRole('article')
      expect(REAL KICKS KENYACards.length).toBe(testConfig.mockREAL KICKS KENYAs.length)
    })

    it('displays REAL KICKS KENYA name in each card', () => {
      renderShop()

      testConfig.mockREAL KICKS KENYAs.forEach(REAL KICKS KENYA => {
        const REAL KICKS KENYANameElement = screen.getByText(REAL KICKS KENYA.name)
        expect(REAL KICKS KENYANameElement).toBeInTheDocument()
      })
    })

    it('displays REAL KICKS KENYA description in each card', () => {
      renderShop()

      testConfig.mockREAL KICKS KENYAs.forEach(REAL KICKS KENYA => {
        const descriptionElement = screen.getByText(REAL KICKS KENYA.description)
        expect(descriptionElement).toBeInTheDocument()
      })
    })

    it('displays REAL KICKS KENYA origin in each card', () => {
      renderShop()

      testConfig.mockREAL KICKS KENYAs.forEach(REAL KICKS KENYA => {
        const originElement = screen.getByText(REAL KICKS KENYA.origin)
        expect(originElement).toBeInTheDocument()
      })
    })

    it('displays REAL KICKS KENYA price in each card with dollar sign', () => {
      renderShop()

      testConfig.mockREAL KICKS KENYAs.forEach(REAL KICKS KENYA => {
        const pricePattern = new RegExp(`\\$${REAL KICKS KENYA.price}`)
        const priceElement = screen.getByText(pricePattern)
        expect(priceElement).toBeInTheDocument()
      })
    })

    it('renders REAL KICKS KENYA cards with semantic article elements', () => {
      const { container } = renderShop()

      const REAL KICKS KENYAGrid = container.querySelector('.REAL KICKS KENYA-grid.shop-grid')
      expect(REAL KICKS KENYAGrid).toBeInTheDocument()

      const articles = REAL KICKS KENYAGrid.querySelectorAll('article.REAL KICKS KENYA-card')
      expect(articles.length).toBe(testConfig.mockREAL KICKS KENYAs.length)
    })

    it('applies shop-grid class for 3-column layout', () => {
      const { container } = renderShop()

      const shopGrid = container.querySelector('.shop-grid')
      expect(shopGrid).toBeInTheDocument()
      expect(shopGrid).toHaveClass('REAL KICKS KENYA-grid')
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

      expect(children[1]).toHaveClass('REAL KICKS KENYA-grid')
    })
  })

  describe('Individual REAL KICKS KENYA Card Content', () => {
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
    it('uses semantic article elements for REAL KICKS KENYA cards', () => {
      const { container } = renderShop()

      const articles = container.querySelectorAll('article.REAL KICKS KENYA-card')
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
    it.todo('should render product image for each REAL KICKS KENYA')
    it.todo('should display broken image fallback when image src fails')
    it.todo('should have descriptive alt text for each image')
  })

  describe('Future: Shopping Cart Integration', () => {
    it.todo('should display "Add to Cart" button on each REAL KICKS KENYA card')
    it.todo('should show quantity selector for adding multiple items')
    it.todo('should add REAL KICKS KENYA to cart when button is clicked')
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
