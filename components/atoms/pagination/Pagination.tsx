import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styles from './Pagination.module.css'

interface Props {
  handlePageClick: (selectedItem: { selected: number }) => void;
  pageCount: number;
  pageNumber: number;
}

export default function Pagination({handlePageClick, pageCount, pageNumber}: Props) {
  return (
    <div data-testid='pagination'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.pageItem}
        previousLinkClassName={styles.pageLink}
        nextClassName={styles.pageItem}
        nextLinkClassName={styles.pageLink}
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pageLink}
        activeClassName={styles.activePage}
        forcePage={pageNumber}
      />
    </div>
  )
}