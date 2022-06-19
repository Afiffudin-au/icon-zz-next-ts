import React, { useEffect, useState } from 'react'
import styles from './AutoSuggest.module.scss'
import Link from 'next/link'
import { LoadingLinear } from '../Progress/LoadingLinear'
import useSuggest from '../../hooks/useSuggest'
interface AutoSuggestItems {
  token: string
  query: string
  limit: number
  typeToSearch: string
}
function AutoSuggest({
  token,
  query,
  limit,
  typeToSearch,
}: Partial<AutoSuggestItems>) {
  const { getIconSuggest, getPackSuggest, isLoading, keywords, reset } =
    useSuggest()
  useEffect(() => {
    const userText = query?.replace(/^\s+/, '').replace(/\s+$/, '')
    let controller = new AbortController()
    if (typeToSearch === 'icons') {
      getIconSuggest(controller, token, query, limit, userText, typeToSearch)
    }
    if (typeToSearch === 'packs') {
      getPackSuggest(controller, token, query, limit, userText, typeToSearch)
    }
    return () => {
      controller.abort()
    }
  }, [query, typeToSearch])
  return (
    <>
      {isLoading && <LoadingLinear />}
      {keywords.length > 0 && (
        <article className={styles.suggestions}>
          {keywords?.map((item: string, index: number) => (
            <div key={item} className={styles.keywordItem}>
              {typeToSearch === 'icons' ? (
                <Link href={`/search-icons/${item.toLowerCase()}`}>
                  <a>
                    <p className={styles.title}>{item}</p>
                  </a>
                </Link>
              ) : typeToSearch === 'packs' ? (
                <Link href={`/search-packs/${item.toLowerCase()}`}>
                  <a>
                    <p className={styles.title}>{item}</p>
                  </a>
                </Link>
              ) : null}
            </div>
          ))}
        </article>
      )}
    </>
  )
}

export default AutoSuggest
