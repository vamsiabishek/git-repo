import styles from './Loading.module.css'

export default function Loading() {
  return(
    <div className={styles.spinnerContainer} data-testid='loading-spinner'>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  )
}