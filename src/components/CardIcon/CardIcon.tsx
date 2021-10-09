import React, { useState } from 'react'
import { DarkTooltip } from '../Mui-Custom/DarkTooltip'
import style from './CardIcon.module.scss'
// import { useGetIconDetail } from '../../custom-hooks/useGetIconDetail/useGetIconDetail'
import { useAppSelector } from '../../redux/app/hooks'
import { selectTokenBlocks } from '../../redux/features/icon/iconSlice'
import StarIcon from '@mui/icons-material/Star'
// import ModalDetailIcon from '../ModalDetailIcon/ModalDetailIcon'
import Modal from '@mui/material/Modal'
import Image from 'next/image'
import Fade from '@mui/material/Fade'
interface CardIconItems {
  description: string
  id: number
  packId: number
  image: string
  premium: any
}
function CardIcon({
  image,
  id,
  description,
  packId,
  premium,
}: Required<CardIconItems>) {
  // const { getIconDetail } = useGetIconDetail()
  const { token } = useAppSelector(selectTokenBlocks)
  const [open, setOpen] = useState<boolean>(false)
  const [iconId, setIconId] = useState<number>(0)
  const handleDetail = () => {
    // getIconDetail(id, token)
    setIconId(id)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div className={style.cardIcon} onClick={handleDetail}>
        {premium !== 0 ? <StarIcon /> : null}
        <DarkTooltip
          title={description}
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}>
          <div style={{ width: '64px', margin: 'auto' }}>
            <Image
              src={image}
              alt={description}
              blurDataURL='/e8e8e8.png'
              placeholder='blur'
              layout='responsive'
              width='100%'
              height='100%'
              objectFit='contain'
              quality={100}
            />
          </div>
        </DarkTooltip>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{ overflowY: 'scroll' }}>
        <ModalDetailIcon handleClose={handleClose} iconId={iconId} />
      </Modal> */}
    </>
  )
}

export default CardIcon
