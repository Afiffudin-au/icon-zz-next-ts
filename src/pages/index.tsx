import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner/Banner'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import styles from '../styles/Home.module.css'
import { headers } from '../headers'
import { useRouter } from 'next/dist/client/router'
import GridContainer from '../components/GridContainer/GridContainer'
import CardIconPacks from '../components/CardIconPack/CardIconPack'
import { useEffect, useState } from 'react'
import Pagenation from '../components/Pagenation/Pagenation'
import { useAppDispatch } from '../redux/app/hooks'
import { addToken } from '../redux/features/icon/iconSlice'
import { IconPacksItems } from '../interfaces/IconPackInterface'
const Home: NextPage = ({ tokenResult, IconPacks, page }: any) => {
  const dispatch = useAppDispatch()
  const [pageNumber, setPageNumber] = useState<number>(page || 1)
  const router = useRouter()
  const handlePagenation = (page: number) => {
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
        token: tokenResult.data.token,
      })
    )
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Icon zz ts</title>
      </Head>
      <NavigationBar />
      <Banner />
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
      <Pagenation handlePagenation={handlePagenation} page={pageNumber} />
    </div>
  )
}
export const getServerSideProps = async (context: any) => {
  const page = context.query.page || 1
  const limit = context.query.limit || 20
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
  const IconPacks = await axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenResult.data.token,
    },
    url: 'https://api.flaticon.com/v2/items/packs/priority',
    params: {
      page: page,
      limit: limit,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  return {
    props: { tokenResult, IconPacks, page },
  }
}
export default Home
