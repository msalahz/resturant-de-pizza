import { Fragment } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-location'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ListSubheader from '@mui/material/ListSubheader'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

import { IOrder, IOrderItem } from '../../types'
import { useSnackbar } from '../containers/SnackbarContainer'

import { useSession } from '../containers/SessionContainer'
import { useActiveOrderByUserIdQuery, useDeleteOrder, useUpdateOrder } from '../../stores/ordersStore'

import Button from '../ui/Button'
import OrderSummaryItem from './OrderSummaryItem'
import OrderSummaryEmptyPlaceholder from './OrderSummaryEmptyPlaceholder'
import { getOrderSubTotalWithCurrency } from '../../helpers/utils'

function OrderSummary(): JSX.Element {
  const navigate = useNavigate()
  const { getUser } = useSession()
  const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar()
  const { data, isLoading } = useActiveOrderByUserIdQuery(getUser()?.id)
  const { mutate: updateOrder, isLoading: isUpdatingOrder } = useUpdateOrder()
  const { mutate: deleteOrder, isLoading: isDeletingOrder } = useDeleteOrder()

  const handleDeleteOrder = () => {
    if (data?.id)
      deleteOrder(
        { orderId: data.id },
        {
          onSuccess() {
            openSuccessSnackbar('Order delete successfully!')
          },
          onError(err) {
            openErrorSnackbar(err, 'Order delete failed!')
          },
        }
      )
  }

  const handlePlaceOrder = () => {
    if (data?.id)
      updateOrder(
        { data: { ...data, placementTimestamp: Date.now() } },
        {
          onSuccess(order: IOrder) {
            openSuccessSnackbar('Order placed successfully!')
            navigate({ to: `/orders/${order.id}` })
          },
          onError(err) {
            openErrorSnackbar(err, 'Order place failed!')
          },
        }
      )
  }

  const updateOrderItem = (orderItem: IOrderItem) => {
    if (data?.id && orderItem?.id) {
      let items = data.items

      if (orderItem.amount === 0) {
        // remove order item
        items = items.filter((item: IOrderItem) => item?.id !== orderItem?.id)
      } else {
        //find item and update its amount
        for (let i = 0; i < items.length; i++) {
          if (items[i]?.id === orderItem?.id) {
            items[i] = orderItem
            break
          }
        }
      }

      updateOrder(
        { data: { ...data, items } },
        {
          onSuccess() {
            openSuccessSnackbar('Order updated successfully!')
          },
          onError(err) {
            openErrorSnackbar(err, 'Order update failed!')
          },
        }
      )
    }
  }

  if (!data || !data.items.length) return <OrderSummaryEmptyPlaceholder isLoading={isLoading} />

  return (
    <Card sx={{ height: 'auto', minHeight: 350, width: { xs: 1, md: 0.5, lg: 1 } }}>
      <CardContent sx={{ height: 1 }}>
        <Grid container direction="column">
          <Grid container item>
            <List
              subheader={
                <ListSubheader sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">Order Summary</Typography>
                </ListSubheader>
              }
            >
              <Divider sx={{ m: 2 }} />
              {data?.items.map((item) => (
                <Fragment key={item.id}>
                  <ListItem>
                    <OrderSummaryItem
                      data={item}
                      orderId={data.id}
                      onChange={updateOrderItem}
                      disabled={isUpdatingOrder || isDeletingOrder}
                    />
                  </ListItem>
                  <Divider sx={{ m: 1 }} />
                </Fragment>
              ))}
            </List>
          </Grid>

          <Box sx={{ px: 2 }}>
            <Grid container item justifyContent="center" spacing={1}>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ fontSize: 18, fontWeight: 600 }}>
                  Subtotal
                </Typography>
              </Grid>

              <Grid item container xs={6} justifyContent="flex-end">
                <Grid item>
                  <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{getOrderSubTotalWithCurrency(data)}</Typography>
                </Grid>
              </Grid>

              <Grid item container>
                <Button fullWidth disabled={isDeletingOrder} isLoading={isUpdatingOrder} onClick={handlePlaceOrder}>
                  <Typography sx={{ mr: 1 }}>Place Order</Typography> <ShoppingCartCheckoutIcon fontSize="small" />
                </Button>
              </Grid>

              <Grid item container>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={handleDeleteOrder}
                  disabled={isUpdatingOrder}
                  isLoading={isDeletingOrder}
                >
                  <Typography sx={{ mr: 1 }}>Delete Order</Typography> <RemoveShoppingCartIcon fontSize="small" />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderSummary
