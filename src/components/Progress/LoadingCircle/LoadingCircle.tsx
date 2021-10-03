import { CircularProgress } from '@material-ui/core'
import React from 'react'
import style from './LoadingCircle.module.scss'
function LoadingCircle() {
  return (
    <div className={style.loading}>
      <CircularProgress />
    </div>
  )
}

export default LoadingCircle
