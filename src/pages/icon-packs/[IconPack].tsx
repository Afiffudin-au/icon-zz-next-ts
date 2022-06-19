import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SearchAlert from '../../components/Alert/Warning'
import CardIconPacks from '../../components/CardIconPack'
import Drawer from '../../components/Drawers/DrawerForIconPacks/Drawer'
import GridContainer from '../../components/GridContainer'
import NavigationBar from '../../components/NavigationBar'
import Pagenation from '../../components/Pagenation'
import SearchBar from '../../components/SearchBar'
import { headers } from '../../headers'
import { IconPacksItems } from '../../interfaces/IconPackInterface'
import { useAppDispatch } from '../../redux/app/hooks'
import Head from 'next/head'
import { addToken } from '../../redux/features/icon/iconSlice'
import { pageLimiter } from '../../utils/pageLimiter/pageLimiter'
function IconPack({ iconPacks, tokenResult, pageProp, endOfPage }: any) {
  const [pageNumber, setPageNumber] = useState<number>(parseInt(pageProp) || 1)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handlePagenation = (page: number) => {
    if (pageNumber === 0) return
    setPageNumber(page)
    const query: any = router.query
    const path = router.pathname
    query.page = page || 1
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
      <Head>
        <title>Icon Packs : IconZzTs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={`Check out this fantastic collection of icon packs, with ${iconPacks.data.length} icon packs for your desktop, phone tablet, and design.`}
        />
        <meta property='og:title' content='Awesome icon packs - IconZzTs' />
        <meta
          property='og:url'
          content='https://icon-zz-ts.vercel.app/icon-packs/icon-pack'
        />
        <meta property='og:site_name' content='IconZzTs' />
        <meta property='og:image' content={iconPacks?.data[0]?.images.sprite} />
        <meta property='og:image:alt' content='Icon packs' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content={`Check out this fantastic collection of icon packs, with ${iconPacks.data.length} icon packs for your desktop, phone tablet, and design.`}
        />
      </Head>
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
          endOfPage={endOfPage}
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
    color: context.query.color || 2,
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
  let endOfPage
  if (parseInt(params.limit) !== iconPacks.metadata.count) {
    endOfPage = pageLimiter(1, 1)
  } else {
    const limitCount = Math.floor(
      iconPacks.metadata.total / iconPacks.metadata.count
    )
    endOfPage = pageLimiter(parseInt(pageProp), limitCount)
  }
  return {
    props: {
      iconPacks,
      tokenResult,
      pageProp,
      key,
      endOfPage,
    },
  }
}
