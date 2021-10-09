import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CardIcon from '../../components/CardIcon/CardIcon'
import GridContainerIcon from '../../components/GridContainerIcon/GridContainerIcon'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Pagenation from '../../components/Pagenation/Pagenation'
import SearchBar from '../../components/SearchBar/SearchBar'
import { headers } from '../../headers'
import { IconItems } from '../../interfaces/iconItem'

function SearchIcon({ page, tokenResult, dataIcons }: any) {
  const [pageNumber, setPageNumber] = useState<number>(page || 1)
  const router = useRouter()
  const handlePagenation = (page: number) => {
    if (page === 0) return
    setPageNumber(page)
    const query: any = router.query
    const path = router.pathname
    query.page = page
    query.limit = 30
    router.push({
      pathname: path,
      query,
    })
  }
  return (
    <div>
      <NavigationBar />
      <SearchBar />
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
      <Pagenation handlePagenation={handlePagenation} page={pageNumber} />
    </div>
  )
}

export default SearchIcon
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
  const dataIcons = await axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenResult.data.token,
    },
    url: 'https://api.flaticon.com/v2/items/icons/priority',
    params: {
      q: query,
      limit: limit,
      page: page,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  return {
    props: {
      page,
      tokenResult,
      dataIcons,
      key,
    },
  }
}
