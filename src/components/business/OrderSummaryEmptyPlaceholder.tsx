import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

function OrderSummaryEmptyPlaceholder(): JSX.Element {
  return (
    <Card sx={{ height: 'auto', minHeight: 350, width: { xs: 1, md: 0.5, lg: 1 } }}>
      <CardContent sx={{ height: 1 }}>
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: 1 }}>
          <Grid item>
            <img src="images/empty_cart.png" alt="" style={{ width: '100%' }} />
          </Grid>

          <Grid item>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Please add some item from the menu to place an order
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderSummaryEmptyPlaceholder
