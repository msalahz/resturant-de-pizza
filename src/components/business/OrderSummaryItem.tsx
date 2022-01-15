import { memo } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { IOrderItem } from '../../types'
import { useOrderItemByIdQuery } from '../../stores/ordersStore'
import { getOrderItemTotalWithCurrency } from '../../helpers/utils'

import TextFieldWithIncrementDecrement from '../ui/TextFieldWithIncrementDecrement'

type Props = {
  data: IOrderItem
  orderId: string
  disabled?: boolean
  onChange: (orderItem: IOrderItem) => void
}

function OrderSummaryItem({ data, orderId, disabled = false, onChange }: Props): JSX.Element {
  const { data: orderItem } = useOrderItemByIdQuery(orderId, data.id, { initialData: data })
  const updateOrderItemAmount = (amount: number) => onChange({ ...orderItem, amount } as IOrderItem)
  const orderedAmount = orderItem?.amount ?? 0

  return (
    <Grid container spacing={1}>
      <Grid item container xs={10} alignItems="center">
        <Typography noWrap sx={{ fontSize: 15, fontWeight: 700, width: 1 }} title={data?.product?.type}>
          {data?.product?.type}
        </Typography>
      </Grid>

      <Grid item container xs={2} justifyContent="flex-end" alignItems="center">
        <IconButton onClick={() => updateOrderItemAmount(0)}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item xs={8}>
        <TextFieldWithIncrementDecrement disabled={disabled} value={orderedAmount} onChange={updateOrderItemAmount} />
      </Grid>

      <Grid item container xs={4} justifyContent="flex-end" alignItems="center">
        <Typography sx={{ fontSize: 15, fontWeight: 600 }}>${getOrderItemTotalWithCurrency(data)}</Typography>
      </Grid>
    </Grid>
  )
}

export default memo(OrderSummaryItem)
