import Grid from '@mui/material/Grid'

import { useProductsQuery } from '../stores/productStore'

import MenuItem from '../components/business/MenuItem'
import Loading from '../components/layout/Loading'
import MainLayout from '../components/layout/MainLayout'
import OrderSummary from '../components/business/OrderSummary'

function Home(): JSX.Element {
  const { data: products, isLoading } = useProductsQuery()

  if (isLoading) return <Loading />

  return (
    <MainLayout>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" sx={{ px: { xs: 2, lg: 0 } }}>
        <Grid container item xs={12} lg={9} spacing={2} justifyContent="flex-start" alignItems="center">
          {Array.isArray(products)
            ? products.map((product) => (
                <Grid
                  key={product.id}
                  item
                  container
                  xs={12}
                  md={6}
                  lg={4}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <MenuItem data={product} />
                </Grid>
              ))
            : null}
        </Grid>

        <Grid item xs={12} lg={3} justifyContent="flex-start" alignContent="center">
          <OrderSummary />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Home
