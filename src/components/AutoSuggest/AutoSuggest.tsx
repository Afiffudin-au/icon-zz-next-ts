import React, { useEffect, useState } from 'react'
import styles from './AutoSuggest.module.scss'
import Link from 'next/link'
import { LoadingLinear } from '../Progress/LoadingLinear/LoadingLinear'
interface AutoSuggestItems {
  token: string,
  query: string,
  limit: number,
  typeToSearch: string
}
function AutoSuggest({ token, query, limit, typeToSearch }: Partial<AutoSuggestItems>) {
  const [keywords, setKeywords] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const userText = query?.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      setKeywords([])
      return
    }
    let controller = new AbortController();
    if (typeToSearch === 'icons') {
      setIsLoading(true)
      fetch(`https://api.flaticon.com/v2/search/icons/priority?q=${query}&limit=${limit}`, {
        signal: controller.signal,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }).then((res: any) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          return res.json()
        }
      }).then(data => {
        setIsLoading(false)
        const array = data.data.map((item: any) => item.description)
        const unique = [...new Set(array)]
        setKeywords(unique)
      }).catch(err => {
        setIsLoading(false)
        console.error('Error', err)
      })
    }
    if (typeToSearch === 'packs') {

    }
    return () => {
      controller.abort();
    };
  }, [query])
  return (
    <>
      {
        isLoading && <LoadingLinear />
      }
      {
        keywords.length > 0 && <article className={styles.suggestions}>
          {
            keywords?.map((item: any, index: number) => (
              <div key={item} className={styles.keywordItem}>
                <Link href={`/search-icons/${item}`}>
                  <a>
                    <p className={styles.title}>{item}</p>
                  </a>
                </Link>
              </div>

            ))
          }
        </article>
      }
    </>
  )
}

export default AutoSuggest