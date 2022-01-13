import CssBaseline from '@mui/material/CssBaseline'
import { Theme, ThemeProvider } from '@mui/material/'
import { StyledEngineProvider } from '@mui/material/styles'

import defaultTheme from '../../theme'

type Props = {
  theme?: Theme
  children: JSX.Element
}

function MuiContainer({ children, theme = defaultTheme }: Props): JSX.Element {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiContainer
