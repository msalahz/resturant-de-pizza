import AppRouter from './AppRouter'
import MuiContainer from './components/containers/MuiContainer'
import { SessionProvider } from './components/containers/SessionContainer'
import { SnackbarProvider } from './components/containers/SnackbarContainer'
import ReactQueryContainer from './components/containers/ReactQueryContainer'

function App() {
  return (
    <ReactQueryContainer>
      <MuiContainer>
        <SnackbarProvider>
          <SessionProvider cookiePrefix="ppr">
            <AppRouter />
          </SessionProvider>
        </SnackbarProvider>
      </MuiContainer>
    </ReactQueryContainer>
  )
}

export default App
