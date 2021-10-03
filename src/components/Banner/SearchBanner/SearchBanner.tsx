import React, { useState } from 'react'
import style from './SearchBanner.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RadioButtonsGroup from '../RadioButtonsGroup/RadioButtonsGroup'
// import { useHistory } from 'react-router'
// import { useAppSelector } from '../../../redux/app/hooks'
// import { useGetSearchIcon } from '../../../custom-hooks/useGetSearchIcon/useGetSearchIcon'
// import { useGetSearchPack } from '../../../custom-hooks/useGetSearchPack/useGetSearchPack'
// import { selectTokenBlocks } from '../../../redux/features/icon/iconSlice'
// import { useAppDispatch } from '../../../redux/app/hooks'
// import { addParameter } from '../../../redux/features/icon/iconSlice'
// import { useGetAccessToken } from '../../../custom-hooks/useGetAccessToken/useGetAccessToken'
function SearchBanner() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [typeToSearch, setTypeToSearch] = useState<string>('icons')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  // const { token, tokenAccepted } = useAppSelector(selectTokenBlocks)
  // const { getSearchIcon } = useGetSearchIcon()
  // const { getSearchPack } = useGetSearchPack()
  // const { getAccessToken } = useGetAccessToken()
  // const history = useHistory()
  // const dispatch = useAppDispatch()
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
      // if (tokenAccepted) {
      //   getSearchIcon(token, query)
      //   dispatch(
      //     addParameter({
      //       query: query,
      //     })
      //   )
      // } else {
      //   getAccessToken()
      // }
      // history.push('/search-icons')
    }
    if (typeToSearch === 'packs') {
      // if (tokenAccepted) {
      //   getSearchPack(token, query)
      //   dispatch(
      //     addParameter({
      //       query: query,
      //     })
      //   )
      // } else {
      //   getAccessToken()
      // }
      // history.push('/search-packs')
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
    </>
  )
}

export default SearchBanner
