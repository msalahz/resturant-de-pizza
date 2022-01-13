import _merge from 'lodash/merge'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const getOverrides = (opts: ThemeOptions): ThemeOptions => ({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 15,
        },
      },
    },
  },
})
const options: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto" , ans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#ff982b',
      contrastText: '#f7f7f7',
    },
    secondary: {
      main: '#111111',
    },
    background: {
      default: '#f7f7f7',
    },
    text: {
      primary: '#4A4949',
    },
  },
  shape: {
    borderRadius: 4,
  },
}
// A custom theme for this app
const theme = createTheme(_merge({}, options, getOverrides(options)))

export default theme
