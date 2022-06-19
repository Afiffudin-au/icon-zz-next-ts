import React from 'react'
import styles from './ModalDetailIcon.module.scss'
import { useStylesModal } from '../../hooks/useStylesModal/indeex'
import { useAppSelector } from '../../redux/app/hooks'
import {
  selectIconDetailBlocks,
  selectTokenBlocks,
} from '../../redux/features/icon/iconSlice'
import { LoadingLinear } from '../Progress/LoadingLinear'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Button from '../Inputs/Button'
import { sizeParams } from './paramater'
import useGetDownloadIcon from '../../hooks/useGetDownloadIcon'
import Image from 'next/image'
import { useRouter } from 'next/router'
interface DetailIconItems {
  category: string
  category_id: string
  description: string
  downloads: string
  id: number
  images: {
    png: {
      [128]: string
      [512]: string
    }
    svg: string
  }
  pack_id: number
  pack_name: string
  premium: number
  tags: string
  tags_id: string
}
function ModalDetailIcon({ handleClose, iconId }: any) {
  const classes = useStylesModal()
  const { dataIconDetails, loading } = useAppSelector(selectIconDetailBlocks)
  const { data }: { data: DetailIconItems } = dataIconDetails
  const tagsSplit = data?.tags?.split(',')
  const { token } = useAppSelector(selectTokenBlocks)
  const { getDownloadIcon } = useGetDownloadIcon()
  const [size, setSize] = React.useState<string>('')
  const [format, setFormat] = React.useState<string>('')
  const router = useRouter()
  const handleSearchByTag = (tag: string) => {
    router.push(`/search-icons/${tag}`)
  }
  const handleDownloadIcon = () => {
    if (format === '' || size === '') {
      alert('Please Select Format And Size')
      return
    }
    getDownloadIcon(token, iconId, iconId, size, format)
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
                src={data?.images?.png[512]}
                blurDataURL='/e8e8e8.png'
                placeholder='blur'
                alt={data?.description}
                width={300}
                height={300}
                objectFit='fill'
                layout='responsive'
                quality={100}
              />
            </div>
            <div className={styles.content1}>
              <p>Title : {data?.description}</p>
              <p>Category : {data?.category}</p>
              <p>Downloads : {data?.downloads}</p>
              <p>Pack Name : {data?.pack_name}</p>
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
              <div>
                <select
                  name=''
                  id=''
                  className={styles.selectResolution}
                  onChange={(e) => setSize(e.target.value)}>
                  <option value=''>Choose Resolution</option>
                  {sizeParams.map((item: any, index: number) => (
                    <option key={item} value={item}>
                      {item} px
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.selectFormat}>
                <label htmlFor='select-type'>
                  Png
                  <input
                    type='radio'
                    name='radio'
                    onClick={() => setFormat('png')}
                  />
                </label>
              </div>

              <Button onClick={handleDownloadIcon}>Download</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalDetailIcon
