import { Link as RouterLink, useNavigate } from 'react-location'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Link,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material'

import { useOrdersHistoryByUserIdQuery } from '../../stores/ordersStore'
import { useSession } from '../../components/containers/SessionContainer'
import { useSnackbar } from '../../components/containers/SnackbarContainer'

import Loading from '../../components/layout/Loading'
import MainLayout from '../../components/layout/MainLayout'
import { getOrderSubTotalWithCurrency, toShortLocalDateTime } from '../../helpers/utils'

function Orders(): JSX.Element {
  const navigate = useNavigate()
  const { openErrorSnackbar } = useSnackbar()
  const { getUser } = useSession()
  const { data, isLoading } = useOrdersHistoryByUserIdQuery(getUser()?.id, {
    onError(err) {
      openErrorSnackbar(err, 'Fetching order history failed!')
    },
  })

  if (isLoading) return <Loading />

  return (
    <MainLayout>
      <TableContainer component={Paper}>
        <Typography sx={{ flex: '1 1 100%', p: 2 }} variant="h6" id="tableTitle" component="div">
          Order History
        </Typography>

        <Table sx={{ width: 1 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontSize: 17 } }}>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow sx={{ '& td': { fontSize: 16, textAlign: 'center' } }}>
                <TableCell colSpan={3}> No orders yet</TableCell>
              </TableRow>
            ) : (
              data?.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  onClick={() => navigate({ to: `/orders/${order.id}` })}
                  sx={{ '&:last-child td': { border: 0 }, cursor: 'pointer', '& td': { fontSize: 16 } }}
                >
                  <TableCell>{toShortLocalDateTime(order?.placementTimestamp)}</TableCell>
                  <TableCell>{getOrderSubTotalWithCurrency(order)}</TableCell>
                  <TableCell align="right">
                    <RouterLink to={`/orders/${order.id}`} target="_blank">
                      <Link component="p" color="primary">
                        <OpenInNewIcon />
                      </Link>
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default Orders
