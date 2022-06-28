import React from 'react'
import style from './Pagination.module.scss'
function Pagination({
  page,
  handlePagination,
  endOfPage,
}: {
  page: number
  handlePagination: any
  endOfPage?: any
}) {
  return (
    <div className={style.pagination}>
      <div
        style={{ display: page === 1 ? 'none' : 'block' }}
        onClick={() => handlePagination(page - 1)}
        className={style.arrowBack}>
        <p>Previous</p>
      </div>
      <div>
        <p className={style.pageNumber}>{page}</p>
      </div>
      <div
        style={{ display: endOfPage ? 'none' : 'block' }}
        onClick={() => handlePagination(page + 1)}
        className={style.arrowForward}>
        <p>Next</p>
      </div>
    </div>
  )
}

export default Pagination
