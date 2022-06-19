import React, { useState } from 'react'
import style from './SearchBanner.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RadioButtonsGroup from '../RadioButtonsGroup'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../redux/app/hooks'
import { selectTokenBlocks } from '../../../redux/features/icon/iconSlice'
import { DebounceInput } from 'react-debounce-input'
import AutoSuggest from '../../AutoSuggest'
function SearchBanner() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [typeToSearch, setTypeToSearch] = useState<string>('icons')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { token } = useAppSelector(selectTokenBlocks)
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
  const handleSearch = (e: any) => {
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
  return (
    <>
      <form onSubmit={handleSearch} className={style.searchBanner} action='/'>
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
            className={style.searchInput}
            forceNotifyByEnter
            debounceTimeout={500}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div onClick={handleSearch} className={style.searchButton}>
            <div>
              <SearchIcon style={{ color: 'white' }} />
            </div>
          </div>
        </div>
        <AutoSuggest
          token={token}
          query={query}
          limit={10}
          typeToSearch={typeToSearch}
        />
      </form>
    </>
  )
}

export default SearchBanner
