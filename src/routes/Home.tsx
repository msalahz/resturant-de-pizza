import Grid from '@mui/material/Grid'
import { useProductsQuery } from '../stores/productStore'

import Loading from '../components/layout/Loading'
import MainLayout from '../components/layout/MainLayout'
import MenuItem from '../components/MenuItem'

function Home(): JSX.Element {
  const { data: products, isLoading } = useProductsQuery()

  if (isLoading) return <Loading />

  return (
    <MainLayout>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
        {Array.isArray(products)
          ? products.map((p) => (
              <Grid key={p.id} item container xs={12} md={6} lg={4} justifyContent="flex-start" alignItems="center">
                <MenuItem product={p} />
              </Grid>
            ))
          : null}
      </Grid>
    </MainLayout>
  )
}

export default Home
