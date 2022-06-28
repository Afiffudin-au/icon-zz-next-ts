import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SearchAlert from '../../components/Alert/Warning'
import CardIconPacks from '../../components/CardIconPack'
import Drawer from '../../components/Drawers/DrawerForSearchPack'
import GridContainer from '../../components/GridContainer'
import NavigationBar from '../../components/NavigationBar'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import { headers } from '../../headers'
import { IconPacksItems } from '../../interfaces/IconPackInterface'
import { useAppDispatch } from '../../redux/app/hooks'
import { addToken } from '../../redux/features/icon/iconSlice'
import Head from 'next/head'
import { pageLimiter } from '../../utils/pageLimiter/pageLimiter'
interface SearchPacks {
  iconPacks: {
    data: any
    metadata: {
      count: number
      page: number
      total: number
    }
  }
  pageProp: any
  tokenResult: any
  query: any
  endOfPage: boolean
}
function SearchPack({
  iconPacks,
  pageProp,
  tokenResult,
  query,
  endOfPage,
}: SearchPacks) {
  const [pageNumber, setPageNumber] = useState<number>(parseInt(pageProp) || 1)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handlePagination = (page: number) => {
    if (page === 0) return
    setPageNumber(page)
    const path = router.pathname
    const query: any = router.query
    query.page = page || 1
    router.push({
      pathname: path,
      query,
    })
  }
  useEffect(() => {
    dispatch(
      addToken({
        token: tokenResult.data.token,
      })
    )
  }, [])
  return (
    <div>
      <Head>
        <title>Search Packs : {query} - IconZzTs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={`Check out this fantastic collection of icon packs, with ${iconPacks.data.length} icon packs for your desktop, phone tablet, and design.`}
        />
        <meta property='og:title' content='Awesome icon packs - IconZzTs' />
        <meta
          property='og:url'
          content={`https://icon-zz-ts.vercel.app/icon-packs/${query} - IconZzTs`}
        />
        <meta property='og:site_name' content='IconZzTs' />
        <meta property='og:image' content={iconPacks?.data[0]?.images.sprite} />
        <meta property='og:image:alt' content='Search icon packs' />
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
        <Pagination
          endOfPage={endOfPage}
          handlePagination={handlePagination}
          page={parseInt(pageProp)}
        />
      ) : (
        <SearchAlert />
      )}
    </div>
  )
}

export default SearchPack
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const pageProp = context.query.page || 1
  const key = query
  const params = {
    q: context.query.query,
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
  const iconPacks = await axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenResult.data.token,
    },
    url: 'https://api.flaticon.com/v2/search/packs',
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
    props: { key, iconPacks, pageProp, tokenResult, query, endOfPage },
  }
}
