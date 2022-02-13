import React from 'react'
import style from './Pagenation.module.scss'
function Pagenation({
  page,
  handlePagenation,
  endOfPage
}: {
  page: number
  handlePagenation: any
  endOfPage?: any
}) {
  return (
    <div className={style.pagenation}>
      <div
        style={{ display: page === 1 ? 'none' : 'block' }}
        onClick={() => handlePagenation(page - 1)}
        className={style.arrowBack}>
        <p>Previous</p>
      </div>
      <div>
        <p className={style.pageNumber}>{page}</p>
      </div>
      <div
        style={{ display: endOfPage ? 'none' : 'block' }}
        onClick={() => handlePagenation(page + 1)}
        className={style.arrowForward}>
        <p>Next</p>
      </div>
    </div>
  )
}

export default Pagenation
