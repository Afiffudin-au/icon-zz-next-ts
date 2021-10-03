import React, { useEffect } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
// import { useGetTotal } from '../../custom-hooks/useGetTotal/useGetTotal'
// import { useAppSelector } from '../../redux/app/hooks'
// import {
//   selectTokenBlocks,
//   selectTotalBlocks,
// } from '../../redux/features/icon/iconSlice'
import style from './Banner.module.scss'
import SearchBanner from './SearchBanner/SearchBanner'
function Banner() {
  // const { getTotalIcon } = useGetTotal()
  // const { token, tokenAccepted } = useAppSelector(selectTokenBlocks)
  // const { iconTotals } = useAppSelector(selectTotalBlocks)
  // useEffect(() => {
  //   if (token) {
  //     getTotalIcon(token)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tokenAccepted])
  return (
    <div className={style.banner}>
      <Jumbotron className={style.jumbotron} fluid>
        <Container>
          <h1 className={style.title}>
            {/* Access {iconTotals.toLocaleString()} vector icons */}
            20.000
          </h1>
          <p className={style.subTitle}>
            The <strong>largest database</strong> of free icons available in
            PNG, SVG, EPS, PSD and BASE 64 formats.
          </p>
          <SearchBanner />
        </Container>
      </Jumbotron>
    </div>
  )
}

export default Banner
