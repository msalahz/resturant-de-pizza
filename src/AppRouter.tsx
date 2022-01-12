import { lazy, Suspense } from 'react'
import { ReactLocation, Router, Outlet } from 'react-location'
import { ReactLocationDevtools } from 'react-location-devtools'

import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Loading from './components/layout/Loading'

const location = new ReactLocation() // Set up a ReactLocation instance
const Orders = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: 'orders.route' */ './routes/Orders'))

function App(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Router
        location={location}
        routes={[
          { path: '/', element: <Home /> },
          { path: '/orders', element: <Orders /> },
          { path: '/*', element: <NotFound /> },
        ]}
      >
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} position="bottom-right" />
      </Router>
    </Suspense>
  )
}

export default App
