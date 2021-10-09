import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CardIconPacks from '../../components/CardIconPack/CardIconPack'
import GridContainer from '../../components/GridContainer/GridContainer'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Pagenation from '../../components/Pagenation/Pagenation'
import SearchBar from '../../components/SearchBar/SearchBar'
import { headers } from '../../headers'
import { IconPacksItems } from '../../interfaces/IconPackInterface'
import { useAppDispatch } from '../../redux/app/hooks'
import { addToken } from '../../redux/features/icon/iconSlice'
function SearchPack({ iconPacks, page, tokenResult }: any) {
  const [pageNumber, setPageNumber] = useState<number>(page || 1)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handlePagenation = (page: number) => {
    if (page === 0) return
    setPageNumber(page)
    const path = router.pathname
    const query: any = router.query
    query.page = page || 1
    query.limit = 30
    router.push({
      pathname: path,
      query,
    })
    console.log(query)
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
      <NavigationBar />
      <SearchBar />
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
      <Pagenation handlePagenation={handlePagenation} page={pageNumber} />
    </div>
  )
}

export default SearchPack
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const page = context.query.page || 1
  const limit = context.query.limit || 30
  const key = query
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
    params: {
      q: query,
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
    props: { key, iconPacks, page, tokenResult },
  }
}
