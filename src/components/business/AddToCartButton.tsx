import _get from 'lodash/get'
import { FirebaseError } from '@firebase/util'

import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { IProduct } from '../../types'
import { uuid } from '../../helpers/common'
import { useSession } from '../containers/SessionContainer'
import { useSnackbar } from '../containers/SnackbarContainer'
import { useCreateOrder, useUpdateOrder, useActiveOrderByUserIdQuery } from '../../stores/ordersStore'

import Button from '../ui/Button'
import TextFieldWithIncrementDecrement from '../ui/TextFieldWithIncrementDecrement'

type Props = {
  product: IProduct
}

function AddToCartButton({ product }: Props): JSX.Element {
  const { getUser } = useSession()
  const { openSnackbar } = useSnackbar()
  const userId = getUser()?.id as string
  const { data } = useActiveOrderByUserIdQuery(userId)
  const { mutate: addOrder, isLoading: isCreatingOrder } = useCreateOrder()
  const { mutate: updateOrder, isLoading: isUpdatingOrder } = useUpdateOrder()
  const orderedAmount = data?.items?.find((item) => item?.product?.id === product.id)?.amount ?? 0

  const onSuccess = () => {
    openSnackbar({
      severity: 'success',
      body: 'Order updated successfully!',
    })
  }

  const onError = (error: FirebaseError) => {
    const title = 'Order update failed!'
    const msg = _get(error, 'message', undefined)
    openSnackbar({
      severity: 'error',
      title: msg ? title : undefined,
      body: msg ? msg : title,
    })
  }

  const handleAddToCart = () => {
    if (data?.id) {
      updateOrder(
        { data: { ...data, items: [...data.items, { id: uuid(), product, amount: 1 }] } },
        { onSuccess, onError }
      )
    } else {
      addOrder(
        { userId, items: [{ id: uuid(), product, amount: 1 }], placementTimestamp: null },
        { onSuccess, onError }
      )
    }
  }

  const updateOrderItemAmount = (amount: number) => {
    if (data?.id) {
      let items = data.items

      if (amount === 0) {
        // remove order item
        items = items.filter((item) => item?.product?.id !== product?.id)
      } else {
        //find item and update its amount
        for (let i = 0; i < items.length; i++) {
          if (items[i]?.product?.id === product?.id) {
            items[i] = { ...items[i], amount }
            break
          }
        }
      }

      updateOrder({ data: { ...data, items } }, { onSuccess, onError })
    }
  }

  return orderedAmount > 0 ? (
    <TextFieldWithIncrementDecrement
      value={orderedAmount}
      onChange={updateOrderItemAmount}
      disabled={isCreatingOrder || isUpdatingOrder}
    />
  ) : (
    <Button fullWidth size="large" onClick={handleAddToCart} isLoading={isCreatingOrder || isUpdatingOrder}>
      <Typography sx={{ mr: 1 }}>Add To CART</Typography> <AddShoppingCartIcon fontSize="small" />
    </Button>
  )
}

export default AddToCartButton
