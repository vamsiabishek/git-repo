import Star from './Star'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Star component', () => {
  const defaultProps = {
    count: 10,
    isSelected: false,
    id: 123,
    onClick: jest.fn()
  }
  it('should render a star symbol with a count', () => {
    render(<Star {...defaultProps} />)
    
    expect(screen.getByTestId('repo-star')).toBeInTheDocument();
    expect(screen.getByTestId('repo-star-count').textContent).toBe(`${defaultProps.count}`)
  })

  it('should call onClick method on star click', () => {
    render(<Star {...defaultProps} />)
    fireEvent.click(screen.getByTestId('repo-star'))

     expect(defaultProps.onClick).toHaveBeenCalled()
  })
})