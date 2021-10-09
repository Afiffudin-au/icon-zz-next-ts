import { withStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'
export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#37474f',
  },
  barColorPrimary: {
    backgroundColor: '#00bcd4',
  },
})(LinearProgress)
