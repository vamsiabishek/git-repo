import styles from './Star.module.css'

interface Props {
  count: number;
  isSelected: boolean; 
  onClick: (id: number) => void;
  id: number;
}

export default function Star({count, isSelected, id, onClick}: Props) {
  return (
    <div className={styles.starContainer}>
      <span data-testid='repo-star' className={`${styles.star} ${isSelected ? styles.selected : ''}`} onClick={() => onClick(id)}>&#9733;</span>
      <span data-testid='repo-star-count'>{count}</span>
    </div>
  )
}