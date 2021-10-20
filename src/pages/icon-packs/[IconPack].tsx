import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SearchAlert from '../../components/Alert/Warning/SearchAlert'
import CardIconPacks from '../../components/CardIconPack/CardIconPack'
import Drawer from '../../components/Drawers/DrawerForIconPacks/Drawer/Drawer'
import GridContainer from '../../components/GridContainer/GridContainer'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Pagenation from '../../components/Pagenation/Pagenation'
import SearchBar from '../../components/SearchBar/SearchBar'
import { headers } from '../../headers'
import { IconPacksItems } from '../../interfaces/IconPackInterface'
import { useAppDispatch } from '../../redux/app/hooks'
import { addToken } from '../../redux/features/icon/iconSlice'

function IconPack({ iconPacks, tokenResult, pageProp }: any) {
  const [pageNumber, setPageNumber] = useState<number>(parseInt(pageProp) || 1)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handlePagenation = (page: number) => {
    if (pageNumber === 0) return
    setPageNumber(page)
    const query: any = router.query
    const path = router.pathname
    query.page = page
    router.push({
      pathname: path,
      query,
    })
  }
  useEffect(() => {
    dispatch(
      addToken({
        token: tokenResult?.data?.token,
      })
    )
  }, [])
  return (
    <div>
      <NavigationBar />
      <SearchBar />
      <Drawer />
      <GridContainer>
        {iconPacks?.data?.map((item: IconPacksItems, index: number) => (
          <CardIconPacks
            key={item.id}
            id={item.id}
            image={item.images.sprite}
            description={item.description}
            numberOfIcons={item.pack_items}
          />
        ))}
      </GridContainer>
      {iconPacks?.data.length !== 0 ? (
        <Pagenation
          handlePagenation={handlePagenation}
          page={parseInt(pageProp)}
        />
      ) : (
        <SearchAlert />
      )}
    </div>
  )
}

export default IconPack
export const getServerSideProps = async (context: any) => {
  const key = context.params.IconPack
  const pageProp = context.query.page || 1
  const params = {
    page: context.query.page || 1,
    limit: context.query.limit || 30,
    categoryName: context.query.catagory,
    color: context.query.color,
    iconType: context.query.iconType,
  }

  if (params.limit === '') delete params.limit
  if (params.page === '') delete params.page
  if (params.categoryName === '') delete params.categoryName
  if (params.color === '') delete params.color
  if (params.iconType === '') delete params.iconType
  const tokenResult = await axios({
    method: 'post',
    headers: headers,
    url: 'https://api.flaticon.com/v2/app/authentication',
    params: {
      apikey: process.env.REACT_APP_API_KEY,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  console.log(key)

  const iconPacks = await axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenResult.data.token,
    },
    url: 'https://api.flaticon.com/v2/items/packs/priority',
    params: params,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  return {
    props: {
      iconPacks,
      tokenResult,
      pageProp,
      key,
    },
  }
}
