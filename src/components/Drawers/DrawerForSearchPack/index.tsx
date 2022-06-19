import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import { TextField, useMediaQuery } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
type Anchor = 'top' | 'left' | 'bottom' | 'right'
import styles from './Drawer.module.scss'
import { useRouter } from 'next/router'
export default function Drawer() {
  const router = useRouter()
  const [alignmentColorType, setAlignmentColorType] = useState('')
  const [alignmentIconType, setAlignmentIconType] = useState('')
  const [perPage, setPerPage] = useState<any>(router.query.page || 1)
  const [perLimit, setPerLimit] = useState<any>(router.query.limit || 30)
  const [catagory, setCatagory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<any>(router.query.query || '')
  const [errorSearchQuery, setErrorSearchQuery] = useState<boolean>(false)
  const handleChangeColorType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignmentColorType(newAlignment)
  }
  const handleChagenIconType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignmentIconType(newAlignment)
  }
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }
  const handleFilter = (anchor: any, condition: any) => {
    toggleDrawer(anchor, condition)
    const path = router.pathname
    const query: any = router.query
    const userText = searchQuery.replace(/^\s+/, '').replace(/\s+$/, '')
    query.page = perPage || 1
    query.limit = perLimit || 30
    query.catagory = catagory || ''
    query.color = alignmentColorType
    query.iconType = alignmentIconType
    if (userText === '') {
      setErrorSearchQuery(true)
      return
    } else {
      setErrorSearchQuery(false)
    }
    query.query = userText
    if (query.catagory === '') delete query.catagory
    if (query.query === '') delete query.query
    if (query.color === null || query.color === '') delete query.color
    if (query.iconType === null || query.iconType === '') delete query.iconType
    router.push({
      pathname: path,
      query,
    })
  }
  const handleClearFilter = () => {
    setPerPage(1)
    setPerLimit(30)
    setCatagory('')
    setSearchQuery('')
    setAlignmentColorType('')
    setAlignmentIconType('')
    router.push(`/search-packs/${router.query.query}`, undefined, {
      shallow: true,
    })
  }
  const matches = useMediaQuery('(min-width:576px)')
  const list = (anchor: Anchor) => (
    <Box sx={matches ? { width: 300 } : { width: 340 }} role='presentation'>
      <Box p='10px' display='flex' flexDirection='column' gap='10px'>
        <TextField
          id='standard-basic'
          label='Search for'
          variant='standard'
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          autoComplete='off'
          error={errorSearchQuery ? true : false}
          helperText={errorSearchQuery ? 'This field cannot be empty!' : null}
        />
        <TextField
          id='standard-basic'
          label='Page'
          variant='standard'
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          type='number'
          autoComplete='off'
          value={perPage}
        />
        <TextField
          id='standard-basic'
          label='Limit'
          variant='standard'
          onChange={(e) => setPerLimit(parseInt(e.target.value))}
          autoComplete='off'
          type='number'
          value={perLimit}
        />
        <TextField
          id='standard-basic'
          label='Category'
          variant='standard'
          onChange={(e) => setCatagory(e.target.value)}
          value={catagory}
          autoComplete='off'
        />
        <ToggleButtonGroup
          fullWidth
          color='primary'
          value={alignmentColorType}
          exclusive
          onChange={handleChangeColorType}>
          <ToggleButton value='1'>monocolor</ToggleButton>
          <ToggleButton value='2'>multicolor</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          fullWidth
          color='primary'
          value={alignmentIconType}
          exclusive
          onChange={handleChagenIconType}>
          <ToggleButton value='standard'>standard</ToggleButton>
          <ToggleButton value='stickers'>stickers</ToggleButton>
        </ToggleButtonGroup>
        <Button fullWidth variant='outlined' onClick={handleClearFilter}>
          Clear Filter
        </Button>
        <Button
          fullWidth
          variant='outlined'
          onClick={() => handleFilter(anchor, false)}>
          Apply Filter
        </Button>
      </Box>
    </Box>
  )
  return (
    <div className={styles.drawerContainer}>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant='outlined' onClick={toggleDrawer(anchor, true)}>
            Filter
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  )
}
