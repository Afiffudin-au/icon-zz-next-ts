import React from 'react'
import styles from './ModalDetailPack.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { useStylesModal } from '../../hooks/useStylesModal/indeex'
import { IconButton } from '@mui/material'
import { useAppSelector } from '../../redux/app/hooks'
import {
  selectIconPackDetailBlocks,
  selectTokenBlocks,
} from '../../redux/features/icon/iconSlice'
import { LoadingLinear } from '../Progress/LoadingLinear'
import Image from 'next/image'
import { useRouter } from 'next/router'
interface DetailPackItems {
  category: string
  category_id: string
  description: string
  downloads: string
  id: number
  images: {
    sprite: string
  }
  premium: number
  tags: string
  tags_id: string
}
function ModalDetailPack({ handleClose }: any) {
  const router = useRouter()
  const classes = useStylesModal()
  const { dataPackDetails, loading } = useAppSelector(
    selectIconPackDetailBlocks
  )
  const { token } = useAppSelector(selectTokenBlocks)
  const { data }: { data: DetailPackItems } = dataPackDetails
  const tagsSplit = data?.tags?.split(',')
  const handleSearchByTag = (tag: string) => {
    router.push(`/search-packs/${tag}`)
    handleClose()
  }
  return (
    <div className={classes.paper + ' ModalDetail ' + styles.wrapModal}>
      <div style={{ position: 'sticky', top: 0, marginBottom: '10px' }}>
        {loading && <LoadingLinear />}
      </div>
      <div className={styles.closeIcon}>
        <IconButton onClick={handleClose} className={styles.borderClose}>
          <CloseIcon style={{ fontSize: 20 }} />
        </IconButton>
      </div>

      {!loading && (
        <div className={styles.contents}>
          <div className={styles.wrap}>
            <div className={styles.imageBox}>
              <Image
                alt={data?.description}
                src={data?.images?.sprite || '/e8e8e8.png'}
                objectFit='cover'
                layout='responsive'
                width={300}
                height={300}
              />
            </div>
            <div className={styles.content1}>
              <p>Title : {data?.description}</p>
              <p>Category : {data?.category}</p>
              <p>Downloads : {data?.downloads}</p>
              <div className={styles.wrapTags}>
                Tags :{' '}
                {tagsSplit?.map((item) => (
                  <p
                    key={item}
                    className={styles.tags}
                    onClick={() => handleSearchByTag(item)}>
                    {item + ','}
                  </p>
                ))}{' '}
              </div>
              <p>License : {data?.premium === 0 ? 'Free' : 'Premium'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalDetailPack
