import styles from './Badge.module.css'

export default function({value, testId}: {value: string, testId: string}) {
  return (
    <span className={styles.badge} data-testid={testId}>{value}</span>
  )
}