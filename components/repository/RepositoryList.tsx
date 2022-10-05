import { IRepositoryList } from '../../interfaces/repository'
import Badge from '../atoms/badge/Badge'
import Star from '../atoms/star/Star'
import { DataContext } from '../../context/DataContext'
import styles from './RepositoryList.module.css'
import { useContext } from 'react'

export default function RepositoryList({data, errorMsg}: {data: IRepositoryList, errorMsg: string | null}) {
  
  const { likedRepositories, onRepoLike } = useContext(DataContext)

  if(errorMsg) {
    return (<div>{errorMsg}</div>)
  }

  const { items } = data

  return (
    <div className={styles.repoList}>
      {items.map(item => {
        const {id, name, html_url, stargazers_count, visibility, description, created_at} = item
        const isStarred = likedRepositories.includes(id);
        return (
          <div key={`repo-${id}`} data-testid='repo-item' className={styles.repo}>
            <div className={styles.repoDetails}>
              <a href={html_url} className={styles.repoName} data-testid='repo-name'>{name}</a>
              <span className={styles.repoDesc} data-testid='repo-desc'>{description}</span>
            </div>
            <div className={styles.repoInfo}>
              <Badge value={visibility} testId='repo-visibility'/>
              <Star count={stargazers_count} isSelected={isStarred} id={id} onClick={onRepoLike}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}