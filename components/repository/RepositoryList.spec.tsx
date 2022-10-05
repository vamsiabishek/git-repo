import RepositoryList from './RepositoryList'
import { render, screen, fireEvent } from '@testing-library/react'
import { repositoriesMock } from '../../mocks/repositories'
import { DataContext } from '../../context/DataContext'

describe('RepositoryList component', () => {
  const defaultProps = {
    data: repositoriesMock,
    errorMsg: null
  }
  it('should display all the repositories', () => {
    render(<RepositoryList {...defaultProps} />)
    const repositories = screen.getAllByTestId('repo-item')

    expect(repositories.length).toBe(repositoriesMock.items.length)
  })

  it('should display error message and not the repositories when error is received', () => {
    const errorMsg = 'Error from server'
    render(<RepositoryList {...defaultProps} errorMsg={errorMsg} />)
    const repositories = screen.queryAllByTestId('repo-item')

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(repositories.length).toBe(0)
  })

  it('should display repository name, description, stars and visibility for all the repositories', () => {
    render(<RepositoryList {...defaultProps} />)

    expect(screen.queryAllByTestId('repo-name').length).toBe(repositoriesMock.items.length);
    expect(screen.queryAllByTestId('repo-desc').length).toBe(repositoriesMock.items.length);
    expect(screen.queryAllByTestId('repo-star').length).toBe(repositoriesMock.items.length);
    expect(screen.queryAllByTestId('repo-star-count').length).toBe(repositoriesMock.items.length);
    expect(screen.queryAllByTestId('repo-visibility').length).toBe(repositoriesMock.items.length);
  })

  it('should call method onRepoLike from context on click of a star', () => {
    const onRepoLike = jest.fn();
    render(
      <DataContext.Provider value={{likedRepositories: [], onRepoLike}}>
        <RepositoryList {...defaultProps} />
      </DataContext.Provider>
    )

    fireEvent.click(screen.queryAllByTestId('repo-star')[0])

    expect(onRepoLike).toHaveBeenCalled()
  })
})