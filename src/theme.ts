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
      main: '#0057FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#fff',
    },
  },
  shape: {
    borderRadius: 4,
  },
}
// A custom theme for this app
const theme = createTheme(_merge({}, options, getOverrides(options)))

export default theme
