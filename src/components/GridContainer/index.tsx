import React from 'react'
import style from './GridContainer.module.scss'
function GridContainer({ children }: { children?: any }) {
  return <div className={style.gridContainer}>{children}</div>
}

export default GridContainer
