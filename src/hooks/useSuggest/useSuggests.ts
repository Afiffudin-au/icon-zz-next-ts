import { useState } from 'react'

export const useSuggest = () => {
  const [keywords, setKeywords] = useState <any>([])
  const [isLoading, setIsLoading] = useState <boolean>(false)
  const getIconSuggest = (controller:any,token:string | undefined, query:string | undefined,limit:number|undefined,userText:any) => {
    if (userText === '') {
      setKeywords([])
      return
    }
    setIsLoading(true)
    fetch(
      `https://api.flaticon.com/v2/search/icons/priority?q=${query}&limit=${limit}`,
      {
        signal: controller.signal,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((res: any) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setIsLoading(false)
        const array = data.data.map((item: any) => item.description)
        const unique = [...new Set(array)]
        setKeywords(unique)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error('Error', err)
      })
  }
  const getPackSuggest = (controller:any,token:string | undefined, query:string | undefined,limit:number|undefined,userText:any) => {
    if (userText === '') {
      setKeywords([])
      return
    }
    setIsLoading(true)
    fetch(
      `https://api.flaticon.com/v2/search/packs/priority?q=${query}&limit=${limit}`,
      {
        signal: controller.signal,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((res: any) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setIsLoading(false)
        const array = data.data.map((item: any) => item.description)
        const unique = [...new Set(array)]
        setKeywords(unique)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error('Error', err)
      })
  }
  return {
    getIconSuggest,
    getPackSuggest,
    keywords,
    isLoading
  }
}
