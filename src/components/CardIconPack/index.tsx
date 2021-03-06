import React, { useState } from 'react'
import style from './CardIconPack.module.scss'
import ModalDetailPack from '../ModalDetailPack'
import Modal from '@mui/material/Modal'
import Image from 'next/image'
import { selectTokenBlocks } from '../../redux/features/icon/iconSlice'
import { useAppSelector } from '../../redux/app/hooks'
import useGetIconPackDetail from '../../hooks/useGetIconPackDetail'
import useGetAccessToken from '../../hooks/useGetAccessToken'
interface CardIconPacksItems {
  image: string
  numberOfIcons: number
  description: string
  id: number
}
function CardIconPacks({
  image,
  numberOfIcons,
  description,
  id,
}: Required<CardIconPacksItems>) {
  const [open, setOpen] = useState(false)
  const { getIconPackDetail } = useGetIconPackDetail()
  const { token } = useAppSelector(selectTokenBlocks)
  const { getAccessToken } = useGetAccessToken()
  const handleClose = () => {
    setOpen(false)
  }
  const handleDetail = () => {
    setOpen(true)
    if (!token) {
      getAccessToken()
    } else {
      getIconPackDetail(id, token)
    }
    getIconPackDetail(id, token)
  }
  return (
    <>
      <div className={style.cardIconPack} onClick={handleDetail}>
        <div className={style.imageThumb}>
          <picture>
            <Image
              blurDataURL='/e8e8e8.png'
              placeholder='blur'
              src={image}
              alt={description}
              width={300}
              height={300}
              objectFit='contain'
              layout='responsive'
              quality={100}
            />
          </picture>
        </div>
        <div className={style.desc}>
          <p className={style.iconDesc}>{description}</p>
          <p className={style.iconNumber}>{numberOfIcons}</p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{ overflowY: 'scroll' }}>
        <ModalDetailPack handleClose={handleClose} />
      </Modal>
    </>
  )
}

export default CardIconPacks
