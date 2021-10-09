import React from 'react'
import style from './GridContainerIcon.module.scss'
function GridContainerIcon({ children }: { children?: any }) {
  return <div className={style.gridContainerIcon}>{children}</div>
}

export default GridContainerIcon
