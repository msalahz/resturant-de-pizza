import AppRouter from './AppRouter'
import MuiContainer from './components/containers/MuiContainer'
import ReactQueryContainer from './components/containers/ReactQueryContainer'

function App() {
  return (
    <ReactQueryContainer>
      <MuiContainer>
        <AppRouter />
      </MuiContainer>
    </ReactQueryContainer>
  )
}

export default App
