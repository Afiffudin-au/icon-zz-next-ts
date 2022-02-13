import React, { useState } from 'react'
import style from './SearchBanner.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RadioButtonsGroup from '../RadioButtonsGroup/RadioButtonsGroup'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../redux/app/hooks'
import { selectTokenBlocks } from '../../../redux/features/icon/iconSlice'
import { useGetAutoSearchIcon } from '../../../hooks/useGetAutoSearchIcon/useGetAutoSearchIcon'
import { CircularProgress } from '@mui/material'
import { DebounceInput } from 'react-debounce-input';
import Link from 'next/link'
import { LoadingLinear } from '../../Progress/LoadingLinear/LoadingLinear'
function SearchBanner() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [typeToSearch, setTypeToSearch] = useState<string>('icons')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { token } = useAppSelector(selectTokenBlocks)
  const { getAutoSearchIcon, keywords, isLoading } = useGetAutoSearchIcon()
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  const handleCheck = (type: string) => {
    setIsChecked(!isChecked)
    setTypeToSearch(type)
    setIsOpenMenu(false)
  }
  const handleOpen = () => {
    setIsOpenMenu(!isOpenMenu)
  }
  const handleClickSearch = (e: any) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    if (typeToSearch === 'icons') {
      router.push(`/search-icons/${query}`)
    }
    if (typeToSearch === 'packs') {
      router.push(`/search-packs/${query}`)
    }
  }
  const onChangeSearch = (e: any) => {
    e.preventDefault()
    setQuery(e.target.value)
    const query = e.target.value || ''
    console.log(e.target.value)
    if (typeToSearch === 'icons') {
      getAutoSearchIcon(token, query, 10)
    }
    // if (typeToSearch === 'packs') {

    // }
  }
  const test = () => {

  }
  return (
    <>
      <form onSubmit={handleClickSearch} className={style.searchBanner} action='/'>
        <div className={style.searchBar}>
          <div className={style.dropdownWrap}>
            <div className={style.dropdown} onClick={handleOpen}>
              {typeToSearch}
              <div>
                <ArrowDropDownIcon style={{ color: 'grey' }} />
              </div>
            </div>
            {isOpenMenu && (
              <RadioButtonsGroup
                handleCheck={handleCheck}
                isChecked={isChecked}
              />
            )}
          </div>
          <DebounceInput
            forceNotifyByEnter
            value={query}
            debounceTimeout={1500}
            onChange={onChangeSearch}
            className={style.searchInput}
            type='text'
          />

          <div onClick={handleClickSearch} className={style.searchButton}>
            <div>
              <SearchIcon style={{ color: 'white' }} />
            </div>
          </div>
        </div>
        {
          isLoading && <LoadingLinear />
        }
        {
          keywords.length > 0 && <article className={style.suggestions}>
            {keywords?.map((item: any, index: number) => (
              <div key={item} className={style.keywordItem}>
                <Link href={`/search-icons/${item}`}>
                  <a>
                    <p className={style.title}>{item}</p>
                  </a>
                </Link>
              </div>
            ))}
          </article>
        }

      </form>
    </>
  )
}

export default SearchBanner
