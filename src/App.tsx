import AppRouter from './AppRouter'
import MuiContainer from './components/containers/MuiContainer'
import { SessionProvider } from './components/containers/SessionContainer'
import ReactQueryContainer from './components/containers/ReactQueryContainer'

function App() {
  return (
    <ReactQueryContainer>
      <MuiContainer>
        <SessionProvider cookiePrefix="ppr">
          <AppRouter />
        </SessionProvider>
      </MuiContainer>
    </ReactQueryContainer>
  )
}

export default App
