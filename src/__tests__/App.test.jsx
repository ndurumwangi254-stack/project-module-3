import { beforeEach, describe, test, expect, vi } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import App from '../components/App'

const mockProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 59.99, stock: 120, image: "", description: "Great headphones" },
  { id: 2, name: "Leather Wallet", category: "Accessories", price: 29.99, stock: 75, image: "", description: "Slim wallet" },
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockProducts), ok: true })
  )
})

describe('Landing Page', () => {
  test('renders landing page with welcome message', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument()
  })

  test('shows stats on landing page', async () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    await waitFor(() => expect(screen.getByText('Total Products')).toBeInTheDocument())
  })
})

describe('Products Page', () => {
  test('renders all products', async () => {
    render(<MemoryRouter initialEntries={['/products']}><App /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.getByText('Leather Wallet')).toBeInTheDocument()
    })
  })

  test('search filters products', async () => {
    render(<MemoryRouter initialEntries={['/products']}><App /></MemoryRouter>)
    await waitFor(() => screen.getByText('Wireless Headphones'))
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'wallet' } })
    expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument()
    expect(screen.getByText('Leather Wallet')).toBeInTheDocument()
  })
})

describe('Add Product Page', () => {
  test('renders add product form', async () => {
    render(<MemoryRouter initialEntries={['/add']}><App /></MemoryRouter>)
    expect(screen.getByText('Add New Product')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter product name')).toBeInTheDocument()
  })

  test('submits new product', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockProducts) })
      .mockResolvedValueOnce({ json: () => Promise.resolve({ id: 3, name: "New Item", category: "Test", price: 10, stock: 5, image: "", description: "" }) })

    render(<MemoryRouter initialEntries={['/add']}><App /></MemoryRouter>)
    fireEvent.change(screen.getByPlaceholderText('Enter product name'), { target: { value: 'New Item' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. Electronics'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '10' } })
    fireEvent.change(screen.getByPlaceholderText('0'), { target: { value: '5' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add Product' }))
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})

describe('Navigation', () => {
  test('nav links are present', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Add Product')).toBeInTheDocument()
  })
})