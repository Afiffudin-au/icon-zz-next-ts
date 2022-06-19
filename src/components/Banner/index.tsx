import React, { useEffect } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import style from './Banner.module.scss'
import SearchBanner from './SearchBanner'
function Banner({ totalIcons }: { totalIcons: Required<any> }) {
  return (
    <div className={style.banner}>
      <Jumbotron className={style.jumbotron} fluid>
        <Container>
          <h1 className={style.title}>
            Access {totalIcons?.toLocaleString()} vector icons
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
