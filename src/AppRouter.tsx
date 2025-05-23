import { lazy, Suspense } from 'react'
import { ReactLocation, Router, Outlet } from 'react-location'
import { ReactLocationDevtools } from 'react-location-devtools'

import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Loading from './components/layout/Loading'
import PrivateRouteRPC from './components/render/PrivateRouteRPC'

const location = new ReactLocation() // Set up a ReactLocation instance
const Orders = lazy(() => import(/* webpackChunkName: 'orders.route' */ './routes/Orders/Orders'))
const OrderDetails = lazy(
  () => import(/* webpackChunkName: 'order.details.route' */ './routes/Orders/[OrderId]/OrderDetails')
)

function App(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Router
        basepath="/resturant-de-pizza/"
        location={location}
        routes={[
          { path: '/', element: <PrivateRouteRPC render={() => <Home />} /> },
          {
            path: 'orders',
            children: [
              { path: '/', element: <PrivateRouteRPC render={() => <Orders />} /> },
              { path: ':orderId', element: <PrivateRouteRPC render={() => <OrderDetails />} /> },
            ],
          },
          { path: '*', element: <NotFound /> },
        ]}
      >
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} position="bottom-right" />
      </Router>
    </Suspense>
  )
}

export default App
