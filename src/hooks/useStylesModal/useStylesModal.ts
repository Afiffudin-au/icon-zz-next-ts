import { createTheme, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
const theme = createTheme();
export const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#263238',
    // boxShadow: theme.spacing(5),
    padding:  '16px 16px 24px',
    boxShadow : '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);'
    // padding: theme.spacing(2, 2, 3),
  },
}));