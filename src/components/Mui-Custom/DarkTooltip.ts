import { withStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

export const DarkTooltip = withStyles((theme: any) => ({
  arrow: {
    color: '#242424',
  },
  tooltip: {
    backgroundColor: '#242424',
    color: 'white',
    boxShadow: '1',
    fontSize: 14,
  },
}))(Tooltip)
