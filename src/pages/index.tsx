import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import NavigationBar from '../components/NavigationBar'
import styles from '../styles/Home.module.css'
import { headers } from '../headers'
import { useRouter } from 'next/dist/client/router'
import GridContainer from '../components/GridContainer'
import CardIconPacks from '../components/CardIconPack'
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { useAppDispatch } from '../redux/app/hooks'
import { addToken } from '../redux/features/icon/iconSlice'
import { IconPacksItems } from '../interfaces/IconPackInterface'
const Home: NextPage = ({ totalIcons, tokenResult, IconPacks, page }: any) => {
  const dispatch = useAppDispatch()
  const [pageNumber, setPageNumber] = useState<number>(parseInt(page) || 1)
  const router = useRouter()
  const handlePagination = (page: number) => {
    if (page === 0) return
    setPageNumber(page)
    const path = router.pathname
    const query: any = router.query
    query.page = page || 1
    query.limit = 20
    router.push({
      pathname: path,
      query,
    })
  }
  useEffect(() => {
    dispatch(
      addToken({
        token: tokenResult,
      })
    )
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Icon zz ts</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={`Check out this fantastic collection of icon packs, with ${IconPacks.data.length} icon packs for your desktop, phone tablet, and design.`}
        />
        <meta property='og:title' content='Awesome icon packs - IconZzTs' />
        <meta
          property='og:url'
          content='https://icon-zz-ts.vercel.app/icon-packs/icon-pack'
        />
        <meta property='og:site_name' content='IconZzTs' />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dblvavqbv/image/upload/v1641015997/portfolio-images/icon-zz_yaf688.png'
        />
        <meta property='og:image:alt' content='Icon packs' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content={`Check out this fantastic collection of icon packs, with ${IconPacks.data.length} icon packs for your desktop, phone tablet, and design.`}
        />
        <meta
          name='google-site-verification'
          content='Gy8DecfJhmdkMec5xQrsKKV6mriP35Ynkhxl1_eX3oU'
        />
      </Head>
      <NavigationBar />
      <Banner totalIcons={totalIcons} />
      <GridContainer>
        {IconPacks &&
          IconPacks?.data?.map((item: IconPacksItems, index: number) => (
            <CardIconPacks
              key={item.id}
              id={item.id}
              image={item.images.sprite}
              description={item.description}
              numberOfIcons={item.pack_items}
            />
          ))}
      </GridContainer>
      <Pagination handlePagination={handlePagination} page={pageNumber} />
    </div>
  )
}
export const getServerSideProps = async (context: any) => {
  const page = context.query.page || 1
  const limit = context.query.limit || 20
  const resToken = await axios({
    method: 'post',
    headers: headers,
    url: 'https://api.flaticon.com/v2/app/authentication',
    params: {
      apikey: process.env.REACT_APP_API_KEY,
    },
  }).catch((err) => {
    return err.response
  })
  if (resToken.status > 300) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  const token = resToken.data.data.token
  const [resTotalIcon, resIconPack] = await Promise.all([
    //TotalIcons
    axios({
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: 'https://api.flaticon.com/v2/total/icons',
      params: {
        apikey: process.env.REACT_APP_API_KEY,
      },
    }).catch((err) => {
      return err.response
    }),
    // IconPacks
    axios({
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: 'https://api.flaticon.com/v2/items/packs/priority',
      params: {
        page: page,
        limit: limit,
        color: 2,
      },
    }).catch((err) => {
      return err.response
    }),
  ])
  if (resIconPack.status > 300) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
  return {
    props: {
      totalIcons:
        resTotalIcon.data.data === undefined ? 0 : resTotalIcon.data.data.total,
      tokenResult: token,
      IconPacks: resIconPack.data,
      page,
    },
  }
}
export default Home
