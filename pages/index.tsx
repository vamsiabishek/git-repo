import { GetServerSidePropsContext } from "next"
import styles from '../styles/Home.module.css'
import { IRepositoryList } from '../interfaces/repository'
import RepositoryList from '../components/repository/RepositoryList'
import Pagination from '../components/atoms/pagination/Pagination'
import { useState, useEffect, useRef } from 'react'
import { DEFAULT_ITEMS_PER_PAGE } from '../constants/Common'
import Loading from '../components/atoms/loading/Loading'
import Head from "next/head"
import LanguageFilter from '../components/atoms/filters/LanguageFilter'

export async function fetchRepositories(page: number, language?: string) {
  const results = await fetch(`http://localhost:3000/api/repositories?page=${page}&lang=${language}`)
  const data = await results.json()
  return data;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchRepositories(0)
  return { props: { data } }
}

export function Home({data}: {data: IRepositoryList | undefined}) {
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [errorMsg, setErrorMsg] = useState<string|null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [repoData, setRepoData] = useState<IRepositoryList>()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  const initialRender = useRef(true);

  useEffect(() => {
    if(data) {
      setRepoData(data)
      setPageCount(Math.ceil(data.total_count / DEFAULT_ITEMS_PER_PAGE))
    }
  }, [data])

  useEffect(() => {
    if (!initialRender.current) {
      updateRepositories(pageNumber, selectedLanguage)
    } else {
      initialRender.current = false
    }
  }, [pageNumber])

  const updateRepositories = async (page: number, lang: string) => {
    setLoading(true)
    const repos = await fetchRepositories(page, lang)
    if (repos.items) {
      setRepoData(repos)
      setPageCount(Math.ceil(repos.total_count / DEFAULT_ITEMS_PER_PAGE))
      setErrorMsg(null)
    } else if (repos.message) {
      setErrorMsg(repos.message)
    }
    setLoading(false)
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected)
  }

  const onLanguageChange = (lang: string) => {
    setSelectedLanguage(lang)
    pageNumber === 0 ? updateRepositories(pageNumber, lang) : setPageNumber(0)
  }

  if(!repoData?.items?.length) {
    return (
      <div>No repositories found...</div>
    )
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Trending Git Repositories</title>
          <meta name="description" content="Trending repositories on Github" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Trending Git Repositories</h1>

          <div className={styles.pageControls} data-testid='top-page-controls'>
            <LanguageFilter selectedLanguage={selectedLanguage} onSelect={onLanguageChange} />
            <Pagination pageCount={pageCount} handlePageClick={handlePageClick} pageNumber={pageNumber}/>
          </div>

          {loading ? <Loading /> : <RepositoryList data={repoData} errorMsg={errorMsg} />}

          {!loading && !errorMsg && <div className={styles.pageControls} data-testid='bottom-page-controls'>
            <Pagination pageCount={pageCount} handlePageClick={handlePageClick} pageNumber={pageNumber}/>
          </div>}
        </main>
      </div>
  )
}

export default Home
