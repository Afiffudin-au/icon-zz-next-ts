import React from 'react'
import style from './Pagenation.module.scss'
function Pagenation({
  page,
  handlePagenation,
}: {
  page: number
  handlePagenation: any
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
        onClick={() => handlePagenation(page + 1)}
        className={style.arrowForward}>
        <p>Next</p>
      </div>
    </div>
  )
}

export default Pagenation
