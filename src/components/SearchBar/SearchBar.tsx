import React, { useEffect, useState } from 'react'
import style from './SearchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RadioButtonsGroup from '../Banner/RadioButtonsGroup/RadioButtonsGroup'
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  addParameter,
  selectTokenBlocks,
} from '../../redux/features/icon/iconSlice'

function SearchBar() {
  const [query, setQuery] = useState<string>('')
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [typeToSearch, setTypeToSearch] = useState<string>('icons')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { token, tokenAccepted } = useAppSelector(selectTokenBlocks)

  const dispatch = useAppDispatch()
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
      if (tokenAccepted) {
        // getSearchIcon(token, query)
        dispatch(
          addParameter({
            query: query,
          })
        )
      } else {
        // getAccessToken()
      }
      // history.push('/search-icons')
    }
    if (typeToSearch === 'packs') {
      if (tokenAccepted) {
        // getSearchPack(token, query)
        dispatch(
          addParameter({
            query: query,
          })
        )
      } else {
        // getAccessToken()
      }
      // history.push('/search-packs')
    }
  }
  useEffect(() => {
    // getAccessToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
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

          <input
            onChange={(e) => setQuery(e.target.value)}
            className={style.searchInput}
            type='text'
          />
          <div onClick={handleSearch} className={style.searchButton}>
            <div>
              <SearchIcon style={{ color: 'white' }} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
