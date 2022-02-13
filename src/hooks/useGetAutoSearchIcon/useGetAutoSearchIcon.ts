import axios from 'axios'
import { useState } from 'react'

export const useGetAutoSearchIcon = ()=>{
  const [keywords,setKeywords] = useState<any>([])
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const getAutoSearchIcon = (token:Required<string>,query:string,limit:number)=>{
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      setKeywords([])
      return
    }
    setIsLoading(true)
    axios({
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: 'https://api.flaticon.com/v2/search/icons/priority',
      params: {
        q : query,
        limit : limit
      },
    }).then(res=>{
      setIsLoading(false)
      // delete duplicates from array
      const array = res.data.data.map((item: any) => item.description)
      const unique = [...new Set(array)]
      //set keywords
      setKeywords(unique)
    }).catch(err=>{
      setIsLoading(false)
      alert(err)
    })
  }
 return{
  getAutoSearchIcon,
  keywords,
  isLoading
 }
}