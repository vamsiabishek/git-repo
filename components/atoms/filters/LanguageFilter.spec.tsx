import LanguageFilter from './LanguageFilter'
import { render, screen, fireEvent } from '@testing-library/react'
import { languages } from '../../../constants/Common'

describe('LanguageFilter component', () => {
  const defaultProps = {
    onSelect: jest.fn(),
    selectedLanguage: 'all'
  }
  it('should render the language options along with an option ALL languages option', () => {
    render(<LanguageFilter {...defaultProps} />)
    const options = screen.getAllByTestId('language-option')

    expect(options.length).toBe(languages.length + 1)
  })

  it('should call onSelect method on option change', () => {
    render(<LanguageFilter {...defaultProps} />)
    fireEvent.change(screen.getByTestId('language-filter'), { target : { value : languages[2] } })

     expect(defaultProps.onSelect).toHaveBeenCalled()
  })
})