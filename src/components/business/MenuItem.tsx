import { styled } from '@mui/system'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MultiClamp from 'react-multi-clamp'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { IProduct } from '../../types'

import AddToCartButton from './AddToCartButton'

type Props = { data: IProduct }

const StyledMultiClamp = styled(MultiClamp)({
  height: 45,
})

function MenuItem({ data: product }: Props): JSX.Element {
  if (!product) return <></>

  return (
    <Card sx={{ width: '100%', minWidth: 250, p: 1 }}>
      <CardMedia component="img" sx={{ width: 200, height: 'auto', margin: 'auto' }} image={product?.image} />
      <CardContent sx={{ position: 'relative', top: 0 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item container alignItems="center">
            <Grid item container xs={8}>
              <Typography noWrap sx={{ fontSize: 17, fontWeight: 700, width: 1 }} title={product.type}>
                {product.type}
              </Typography>
            </Grid>

            <Grid item container xs={4} justifyContent="flex-end">
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>${product.price.toFixed(2)}</Typography>
            </Grid>
          </Grid>

          <Grid item container title={product.description}>
            <StyledMultiClamp ellipsis="..." clamp={2}>
              {product.description}
            </StyledMultiClamp>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Grid item container justifyContent="flex-end">
          <AddToCartButton product={product} />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default MenuItem
