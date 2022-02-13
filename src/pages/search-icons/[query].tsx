import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SearchAlert from '../../components/Alert/Warning/SearchAlert'
import CardIcon from '../../components/CardIcon/CardIcon'
import Drawer from '../../components/Drawers/DrawerForSearchIcon/Drawer'
import GridContainerIcon from '../../components/GridContainerIcon/GridContainerIcon'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Pagenation from '../../components/Pagenation/Pagenation'
import SearchBar from '../../components/SearchBar/SearchBar'
import { headers } from '../../headers'
import { IconItems } from '../../interfaces/iconItem'
import { useAppDispatch } from '../../redux/app/hooks'
import { addToken } from '../../redux/features/icon/iconSlice'
import Head from 'next/head'
import { pageLimiter } from '../../utils/pageLimiter/pageLimiter'
function SearchIcon({ pageProp, tokenResult, dataIcons, query, endOfPage }: any) {
  const [pageNumber, setPageNumber] = useState<number>(parseInt(pageProp) || 1)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handlePagenation = (page: number) => {
    if (page === 0) return
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
      <Head>
        <title>Icons Search : {query} - IconZzTs</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={`Check out this fantastic collection of icons, with ${dataIcons.data.length} icons for your desktop, phone tablet, and design.`}
        />
        <meta property='og:title' content='Awesome icons - IconZzTs' />
        <meta
          property='og:url'
          content={`https://icon-zz-ts.vercel.app/search-icons/${query} - IconZzTs`}
        />
        <meta property='og:site_name' content='IconZzTs' />
        <meta property='og:image' content={dataIcons?.data[0]?.images.png[128]} />
        <meta property='og:image:alt' content='Icons Search' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content={`Check out this fantastic collection of icons, with ${dataIcons.data.length} icons for your desktop, phone tablet, and design.`}
        />
      </Head>
      <NavigationBar />
      <SearchBar />
      <Drawer />
      <GridContainerIcon>
        {dataIcons?.data?.map((item: IconItems, index: number) => (
          <CardIcon
            key={item.id}
            image={item.images.png[128]}
            id={item.id}
            packId={item.pack_id}
            description={item.description}
            premium={item.premium}
          />
        ))}
      </GridContainerIcon>
      {dataIcons?.data.length !== 0 ? (
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

export default SearchIcon
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
    stroke: context.query.strokeType,
  }
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
  const dataIcons = await axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenResult.data.token,
    },
    url: 'https://api.flaticon.com/v2/search/icons/priority',
    params: params,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  let endOfPage
  if (parseInt(params.limit) !== dataIcons.metadata.count) {
    endOfPage = pageLimiter(1, 1)
  } else {
    const limitCount = Math.floor(dataIcons.metadata.total / dataIcons.metadata.count)
    endOfPage = pageLimiter(parseInt(pageProp), limitCount)
  }
  return {
    props: {
      pageProp,
      tokenResult,
      dataIcons,
      key,
      query,
      endOfPage
    },
  }
}
