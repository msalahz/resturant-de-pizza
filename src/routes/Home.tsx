import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { collection, getDocs } from 'firebase/firestore'

import { db } from '../firebase'
import { IProduct } from '../types'

function Home(): JSX.Element {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    async function init() {
      const productsRef = collection(db, 'products')
      const products = await getDocs(productsRef)
      setProducts(products.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IProduct)))
    }

    init().finally()
  }, [])
  return (
    <div>
      <h2>Menu:</h2>
      <Grid container sx={{ width: 1, p: 2 }} spacing={2} justifyContent="space-around" alignItems="center">
        {products.map((p) => (
          <Grid key={p.id} item container xs={12} md={4} lg={3} justifyContent="space-around" alignItems="center">
            <Card sx={{ p: 1, width: 'auto' }}>
              <CardMedia component="img" height="260" image={p?.image} />
              <Typography>{p.type}</Typography>
              <Typography>Price:{p.price}</Typography>
              <Typography noWrap sx={{ width: 250 }}>
                {p.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home
