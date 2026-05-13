import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import AdminPortal from '../AdminPortal'
import { CoffeeProvider } from '../../context/CoffeeContext'
import { testConfig } from '../../tests/config'

const mockValidFormData = {
  name: 'Dark Roast',
  origin: 'Kenya',
  price: '5.50',
  description: 'Deep, bold, and smooth',
}

const mockAnotherValidFormData = {
  name: 'Light Blend',
  origin: 'Colombia',
  price: '4.99',
  description: 'Bright and fruity notes',
}

const renderAdminPortal = () => {
  return render(
    <CoffeeProvider>
      <AdminPortal />
    </CoffeeProvider>
  )
}

describe('AdminPortal', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Admin Portal Header', () => {
    it('renders the "Admin Portal" heading', () => {
      renderAdminPortal()

      const heading = screen.getByRole('heading', { level: 2, name: /Admin Portal/i })
      expect(heading).toBeInTheDocument()
    })

    it('renders the admin intro text', () => {
      renderAdminPortal()

      const introText = screen.getByText(/Add new coffee blends and manage the current menu./i)
      expect(introText).toBeInTheDocument()
    })
  })

  describe('Admin Form Structure', () => {
    it('renders the form with all required input fields', () => {
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)

      expect(nameInput).toBeInTheDocument()
      expect(originInput).toBeInTheDocument()
      expect(priceInput).toBeInTheDocument()
      expect(descriptionInput).toBeInTheDocument()
    })

    it('renders input fields with correct placeholder text', () => {
      renderAdminPortal()

      expect(screen.getByPlaceholderText(/Espresso/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Kenya/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/4.99/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/Smooth and sweet/i)).toBeInTheDocument()
    })

    it('renders the Save button with correct text', () => {
      renderAdminPortal()

      const saveButton = screen.getByRole('button', { name: /Save/i })
      expect(saveButton).toBeInTheDocument()
      expect(saveButton).toHaveAttribute('type', 'submit')
    })

    it('renders form with admin-form class for styling', () => {
      const { container } = renderAdminPortal()

      const form = container.querySelector('form.admin-form')
      expect(form).toBeInTheDocument()
    })
  })

  describe('Form Input Handling', () => {
    it('updates Coffee Name input when user types', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)

      await user.type(nameInput, mockValidFormData.name)

      expect(nameInput).toHaveValue(mockValidFormData.name)
    })

    it('updates Origin input when user types', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const originInput = screen.getByLabelText(/Origin/i)

      await user.type(originInput, mockValidFormData.origin)

      expect(originInput).toHaveValue(mockValidFormData.origin)
    })

    it('updates Price input when user types', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const priceInput = screen.getByLabelText(/Price/i)

      await user.type(priceInput, mockValidFormData.price)

      expect(priceInput).toHaveValue(mockValidFormData.price)
    })

    it('updates Description input when user types', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const descriptionInput = screen.getByLabelText(/Description/i)

      await user.type(descriptionInput, mockValidFormData.description)

      expect(descriptionInput).toHaveValue(mockValidFormData.description)
    })

    it('clears all form fields after successful submission', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockValidFormData.name)
      await user.type(originInput, mockValidFormData.origin)
      await user.type(priceInput, mockValidFormData.price)
      await user.type(descriptionInput, mockValidFormData.description)

      await user.click(saveButton)

      expect(nameInput).toHaveValue('')
      expect(originInput).toHaveValue('')
      expect(priceInput).toHaveValue('')
      expect(descriptionInput).toHaveValue('')
    })
  })

  describe('Form Validation', () => {
    it('shows error message when Coffee Name field is empty on submit', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(originInput, mockValidFormData.origin)
      await user.type(priceInput, mockValidFormData.price)
      await user.type(descriptionInput, mockValidFormData.description)

      await user.click(saveButton)

      const errorMessage = screen.getByText(/Please fill in every field./i)
      expect(errorMessage).toBeInTheDocument()
    })

    it('shows error message when Origin field is empty on submit', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockValidFormData.name)
      await user.type(priceInput, mockValidFormData.price)
      await user.type(descriptionInput, mockValidFormData.description)

      await user.click(saveButton)

      const errorMessage = screen.getByText(/Please fill in every field./i)
      expect(errorMessage).toBeInTheDocument()
    })

    it('shows error message when Price field is empty on submit', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockValidFormData.name)
      await user.type(originInput, mockValidFormData.origin)
      await user.type(descriptionInput, mockValidFormData.description)

      await user.click(saveButton)

      const errorMessage = screen.getByText(/Please fill in every field./i)
      expect(errorMessage).toBeInTheDocument()
    })

    it('shows error message when Description field is empty on submit', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockValidFormData.name)
      await user.type(originInput, mockValidFormData.origin)
      await user.type(priceInput, mockValidFormData.price)

      await user.click(saveButton)

      const errorMessage = screen.getByText(/Please fill in every field./i)
      expect(errorMessage).toBeInTheDocument()
    })

    it('shows success message when all fields are filled and submitted', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockValidFormData.name)
      await user.type(originInput, mockValidFormData.origin)
      await user.type(priceInput, mockValidFormData.price)
      await user.type(descriptionInput, mockValidFormData.description)

      await user.click(saveButton)

      const successMessage = screen.getByText(/Coffee blend added successfully./i)
      expect(successMessage).toBeInTheDocument()
    })

    it('validation error message is displayed with message class', async () => {
      const user = userEvent.setup()
      const { container } = renderAdminPortal()

      const saveButton = screen.getByRole('button', { name: /Save/i })
      await user.click(saveButton)

      const messageElement = container.querySelector('p.message')
      expect(messageElement).toBeInTheDocument()
      expect(messageElement.textContent).toMatch(/Please fill in every field./i)
    })
  })

  describe('Current Roasts Display', () => {
    it('renders "Current roasts" heading', () => {
      renderAdminPortal()

      const heading = screen.getByRole('heading', { level: 3, name: /Current roasts/i })
      expect(heading).toBeInTheDocument()
    })

    it('displays all initial coffees in the current roasts grid', () => {
      renderAdminPortal()

      const coffeeCards = screen.getAllByRole('generic')
        .filter(el => el.closest('.admin-grid'))

      expect(coffeeCards.length).toBeGreaterThanOrEqual(testConfig.mockCoffees.length)
    })

    it('displays coffee details in the admin summary grid', () => {
      renderAdminPortal()

      testConfig.mockCoffees.forEach(coffee => {
        expect(screen.getByText(coffee.name)).toBeInTheDocument()
        expect(screen.getByText(coffee.origin)).toBeInTheDocument()
      })
    })

    it('adds newly submitted coffee to the current roasts grid', async () => {
      const user = userEvent.setup()
      renderAdminPortal()

      const nameInput = screen.getByLabelText(/Coffee Name/i)
      const originInput = screen.getByLabelText(/Origin/i)
      const priceInput = screen.getByLabelText(/Price/i)
      const descriptionInput = screen.getByLabelText(/Description/i)
      const saveButton = screen.getByRole('button', { name: /Save/i })

      await user.type(nameInput, mockAnotherValidFormData.name)
      await user.type(originInput, mockAnotherValidFormData.origin)
      await user.type(priceInput, mockAnotherValidFormData.price)
      await user.type(descriptionInput, mockAnotherValidFormData.description)

      await user.click(saveButton)

      expect(screen.getByText(mockAnotherValidFormData.name)).toBeInTheDocument()
      expect(screen.getByText(mockAnotherValidFormData.origin)).toBeInTheDocument()
    })
  })

  describe('Page Structure', () => {
    it('renders as a section element with admin-page class', () => {
      const { container } = renderAdminPortal()

      const section = container.querySelector('section.admin-page')
      expect(section).toBeInTheDocument()
    })

    it('renders admin card with admin-card class for form', () => {
      const { container } = renderAdminPortal()

      const adminCard = container.querySelector('.admin-card')
      expect(adminCard).toBeInTheDocument()
    })

    it('renders admin summary with admin-summary class for roasts list', () => {
      const { container } = renderAdminPortal()

      const adminSummary = container.querySelector('.admin-summary')
      expect(adminSummary).toBeInTheDocument()
    })
  })

  describe('Future: Delete Coffee', () => {
    it.todo('should display delete button on each coffee card')
    it.todo('should remove coffee from list when delete is clicked')
    it.todo('should show confirmation dialog before deleting')
  })

  describe('Future: Edit Coffee', () => {
    it.todo('should display edit button on each coffee card')
    it.todo('should populate form with existing coffee data when edit is clicked')
    it.todo('should update coffee in list when form is resubmitted')
  })

  describe('Future: Bulk Operations', () => {
    it.todo('should allow selecting multiple coffees for batch operations')
    it.todo('should delete multiple selected coffees at once')
    it.todo('should update price for all selected coffees')
  })

  describe('Future: Data Import/Export', () => {
    it.todo('should export coffee list as CSV file')
    it.todo('should import coffee list from CSV file')
    it.todo('should validate imported data before adding to list')
  })

  describe('Future: Admin Analytics', () => {
    it.todo('should display total number of coffees in inventory')
    it.todo('should show most popular coffee blend')
    it.todo('should display revenue by coffee type')
  })
})
