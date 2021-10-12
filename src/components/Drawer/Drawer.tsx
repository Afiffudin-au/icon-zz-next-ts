import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'

import { TextField } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function Drawer() {
  const [alignmentColorType, setAlignmentColorType] = React.useState('')
  const [alignmentIconType, setAlignmentIconType] = React.useState('')
  const [query, setQuery] = React.useState<string>('')
  const inputPageRef = React.useRef<any>(null)
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
    console.log(inputPageRef.current?.value)
    toggleDrawer(anchor, condition)
  }
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      // onClick={}
    >
      <Box p='10px' display='flex' flexDirection='column' gap='10px'>
        <TextField
          // onChange={(e) => setQuery(e.target.value)}
          // style={{ marginTop: '5px' }}
          id='standard-basic'
          label='Page'
          variant='standard'
          inputRef={inputPageRef}
          // ref={inputPageRef}
        />
        <TextField
          // style={{ marginTop: '5px' }}
          id='standard-basic'
          label='Limit'
          variant='standard'
        />
        <TextField
          // style={{ marginTop: '5px' }}
          id='standard-basic'
          label='Category'
          variant='standard'
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
        <Button
          // style={{ marginTop: '5px' }}
          fullWidth
          variant='outlined'
          onClick={toggleDrawer(anchor, false)}>
          Clear Filter
        </Button>
        <Button
          // style={{ marginTop: '5px' }}
          fullWidth
          variant='outlined'
          onClick={() => handleFilter(anchor, false)}>
          Apply Filter
        </Button>
      </Box>
    </Box>
  )

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
