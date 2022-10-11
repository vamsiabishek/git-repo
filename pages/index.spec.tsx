import Home from './index.page'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { repositoriesMock } from '../mocks/repositories'
import { languages } from '../constants/Common'

describe('Home component', () => {
  
  it('should render page controls when repositories are provided', () => {
    render(<Home data={repositoriesMock} />)
    expect(screen.getByTestId('top-page-controls')).toBeInTheDocument()
    expect(screen.getByTestId('bottom-page-controls')).toBeInTheDocument()
  })

  it('should not render page controls when repositories are not provided', () => {
    render(<Home data={undefined} />)
    expect(screen.queryByTestId('top-page-controls')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bottom-page-controls')).not.toBeInTheDocument()
  })

  it('should show loading spinner while fetching data from server on page change', async () => {
    render(<Home data={repositoriesMock} />)
    const nextPageLink = screen.getAllByText('next >')[0]
    fireEvent.click(nextPageLink)

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    });
  })

  it('should show loading spinner while fetching data from server on language change', async () => {
    render(<Home data={repositoriesMock} />)
    fireEvent.change(screen.getByTestId('language-filter'), { target : { value : languages[2] } })

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    });
  })

  it('should not show bottom page controls while fetching data from server', async () => {
    render(<Home data={repositoriesMock} />)
    const nextPageLink = screen.getAllByText('next >')[0]
    fireEvent.click(nextPageLink)

    await waitFor(() => {
      expect(screen.queryByTestId('bottom-page-controls')).not.toBeInTheDocument()
    });
  })

})