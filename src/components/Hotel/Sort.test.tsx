import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sort from '@/components/Hotel/Sort'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
 useRouter: () => ({
   push: mockPush
 }),
 useSearchParams: () => new URLSearchParams()
}))

describe('Sort', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders default option selected initially', () => {
    render(<Sort />)
    expect(screen.getByRole('combobox')).toHaveValue('')
  })

  it('shows all sorting options', () => {
    render(<Sort />)
    expect(screen.getByText('default')).toBeInTheDocument()
    expect(screen.getByText('Price high-low')).toBeInTheDocument()
    expect(screen.getByText('Price low-high')).toBeInTheDocument()
  })

  it('updates URL when selecting high-low', () => {
    const { getByRole } = render(<Sort />)
    fireEvent.change(getByRole('combobox'), {
      target: { value: 'desc' }
    })
    expect(mockPush).toHaveBeenCalledWith('?sort=desc')
  })

  it('removes sort param when selecting default', () => {
    const { getByRole } = render(<Sort />)
    fireEvent.change(getByRole('combobox'), {
      target: { value: '' }
    })
    expect(mockPush).toHaveBeenCalledWith('?')
  })

  it('maintains selected value from URL', () => {
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: () => 'asc'
    })
    render(<Sort />)
    expect(screen.getByRole('combobox')).toHaveValue('asc')
  })
})
