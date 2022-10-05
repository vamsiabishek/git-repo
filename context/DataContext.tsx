import { createContext, useEffect, useState, ReactNode } from "react"
import { IContextData } from '../interfaces/repository'

const initialData = {
  likedRepositories: [],
  onRepoLike: (id: number) => {}
}

export const DataContext = createContext<IContextData>(initialData)

export default function DataProvider({ children }: { children: ReactNode }) {
  const [initialLoad, setInitialLoad] = useState(true)
  const [likedRepositories, setLikedRepositories] = useState<number[]>([])

  useEffect(() => {
    if (localStorage.getItem("likedRepos")) {
      const likedRepos = JSON.parse(localStorage.getItem("likedRepos") || '')
      setLikedRepositories(likedRepos)
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    if(!initialLoad) {
      localStorage.setItem("likedRepos", JSON.stringify(likedRepositories))
    }
  }, [likedRepositories])

  const onRepoLike = (repoId: number) => {
    const likedRepoIdx = likedRepositories.findIndex(id => repoId === id)
    if(likedRepoIdx === -1) {
      setLikedRepositories((prev: number[]) => [...prev, repoId])
    } else {
      likedRepositories.splice(likedRepoIdx, 1)
      setLikedRepositories([...likedRepositories])
    }
  }

  return (
    <DataContext.Provider value={{ likedRepositories, onRepoLike }}>
      {children}
    </DataContext.Provider>
  )
}