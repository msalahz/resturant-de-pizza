import { useMatch } from 'react-location'
import { Paper, Table, TableRow, TableBody, TableCell, TableHead, Typography, TableContainer } from '@mui/material'

import { useOrderByIdQuery } from '../../../stores/ordersStore'
import { useSnackbar } from '../../../components/containers/SnackbarContainer'
import {
  getCurrency,
  toShortLocalDateTime,
  getOrderItemTotalWithCurrency,
  getOrderSubTotalWithCurrency,
} from '../../../helpers/utils'

import Loading from '../../../components/layout/Loading'
import MainLayout from '../../../components/layout/MainLayout'

function Orders(): JSX.Element {
  const { params = {} } = useMatch()
  const { orderId } = params
  const { openErrorSnackbar } = useSnackbar()
  const { data, isLoading } = useOrderByIdQuery(orderId, {
    onError(err) {
      openErrorSnackbar(err, 'Fetching order failed!')
    },
  })

  if (isLoading) return <Loading />

  return (
    <MainLayout>
      <TableContainer component={Paper}>
        <Typography sx={{ flex: '1 1 100%', p: 2 }} variant="h6">
          Order History
        </Typography>

        <Table sx={{ width: 1 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontSize: 17 } }}>
              <TableCell>Type</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Qty.</TableCell>
              <TableCell>Price </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items?.map((orderItem) => (
              <TableRow hover key={orderItem.id} sx={{ '&:last-child td': { border: 0 }, '& td': { fontSize: 16 } }}>
                <TableCell>{orderItem?.product?.type}</TableCell>
                <TableCell>{getCurrency(orderItem?.product?.price)}</TableCell>
                <TableCell>{orderItem?.amount}</TableCell>
                <TableCell>{getOrderItemTotalWithCurrency(orderItem)}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ '& td': { fontSize: 17, fontWeight: 700 } }}>
              <TableCell colSpan={2} rowSpan={3} />
              <TableCell>Subtotal</TableCell>
              <TableCell>{data ? getOrderSubTotalWithCurrency(data) : getCurrency(0)}</TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { fontSize: 18, fontWeight: 800 } }}>
              <TableCell>Total</TableCell>
              <TableCell>{data ? getOrderSubTotalWithCurrency(data) : getCurrency(0)}</TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { fontSize: 18, fontWeight: 800 } }}>
              <TableCell>Date</TableCell>
              <TableCell>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  {toShortLocalDateTime(data?.placementTimestamp)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default Orders
