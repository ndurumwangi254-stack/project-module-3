import { renderHook } from '@testing-library/react'
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import usePageTitle from '../usePageTitle'

describe('usePageTitle', () => {
  const originalTitle = document.title

  beforeEach(() => { 
    document.title = 'Original Title'
  })

  afterEach(() => {
    document.title = originalTitle
    vi.clearAllMocks()
  })

  it('updates document title with the provided title parameter', () => {
    renderHook(() => usePageTitle('Home'))
    
    expect(document.title).toBe('Coffee R Us | Home')
  })

  it('updates document title when the title prop changes', () => {
    const { rerender } = renderHook(
      ({ title }) => usePageTitle(title),
      { initialProps: { title: 'Home' } }
    )

    expect(document.title).toBe('Coffee R Us | Home')

    rerender({ title: 'Shop' })

    expect(document.title).toBe('Coffee R Us | Shop')
  })

  it('sets the correct format with brand name and title', () => {
    renderHook(() => usePageTitle('Admin Portal'))

    expect(document.title).toMatch(/Coffee R Us \| Admin Portal/)
  })

  describe('Future: Special character handling', () => {
    it.todo('should safely handle special characters in title')
  })

  describe('Future: Long title handling', () => {
    it.todo('should truncate or handle very long page titles')
  })
})
