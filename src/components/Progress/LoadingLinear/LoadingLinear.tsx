import { withStyles } from '@mui/styles'
import { LinearProgress } from '@mui/material'
export const LoadingLinear = withStyles({
  colorPrimary: {
    backgroundColor: '#37474f',
  },
  barColorPrimary: {
    backgroundColor: '#00bcd4',
  },
})(LinearProgress)
