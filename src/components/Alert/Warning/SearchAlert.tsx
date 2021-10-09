import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
function SearchAlert() {
  return (
    <Alert severity='warning'>
      <AlertTitle>Warning</AlertTitle>
      <strong>Your search was not found!</strong>
    </Alert>
  )
}

export default SearchAlert
