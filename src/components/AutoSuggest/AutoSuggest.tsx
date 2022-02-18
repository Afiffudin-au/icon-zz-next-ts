import React, { useEffect, useState } from 'react'
import styles from './AutoSuggest.module.scss'
import Link from 'next/link'
import { LoadingLinear } from '../Progress/LoadingLinear/LoadingLinear'
import { useSuggest } from '../../hooks/useSuggest/useSuggests'
interface AutoSuggestItems {
  token: string,
  query: string,
  limit: number,
  typeToSearch: string
}
function AutoSuggest({ token, query, limit, typeToSearch }: Partial<AutoSuggestItems>) {
  const { getIconSuggest, getPackSuggest, isLoading, keywords } = useSuggest()
  useEffect(() => {
    const userText = query?.replace(/^\s+/, '').replace(/\s+$/, '')
    let controller = new AbortController();
    if (typeToSearch === 'icons') {
      getIconSuggest(controller, token, query, limit, userText)
    }
    if (typeToSearch === 'packs') {
      getPackSuggest(controller, token, query, limit, userText)
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
                {
                  typeToSearch === 'icons' ? (
                    <Link href={`/search-icons/${item}`}>
                      <a>
                        <p className={styles.title}>{item}</p>
                      </a>
                    </Link>
                  ) : typeToSearch === 'packs' ? (
                    <Link href={`/search-packs/${item}`}>
                      <a>
                        <p className={styles.title}>{item}</p>
                      </a>
                    </Link>
                  ) : (null)
                }
              </div>
            ))
          }
        </article>
      }
    </>
  )
}

export default AutoSuggest