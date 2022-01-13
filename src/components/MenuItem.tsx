import { styled } from '@mui/system'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MultiClamp from 'react-multi-clamp'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { IProduct } from '../types'

import Button from './ui/Button'

type Props = { product: IProduct }

const StyledMultiClamp = styled(MultiClamp)({
  height: 45,
})

function MenuItem({ product }: Props): JSX.Element {
  if (!product) return <></>

  return (
    <Card sx={{ width: '100%', minWidth: 320, p: 1 }}>
      <CardMedia component="img" sx={{ width: 200, height: 'auto', margin: 'auto' }} image={product?.image} />
      <CardContent sx={{ position: 'relative', top: 0 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item container alignItems="center">
            <Grid item container xs={9}>
              <Typography noWrap sx={{ fontSize: 20, fontWeight: 'bold', width: 1 }}>
                {product.type} {product.type}
              </Typography>
            </Grid>

            <Grid item container xs={3} justifyContent="flex-end">
              <Typography sx={{ fontSize: 18, fontWeight: '600' }}>$ {product.price}</Typography>
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
          <Button fullWidth size="large">
            <Typography sx={{ mr: 1 }}>Add To CART</Typography> <AddShoppingCartIcon fontSize="small" />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default MenuItem
