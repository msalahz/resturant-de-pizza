import { FirebaseError } from '@firebase/util'
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
  UseMutationResult,
  UseMutationOptions,
} from 'react-query'

import { db } from '../firebase'
import { IOrder, IOrderItem } from '../types'

export const ordersKey = 'orders'
export const activeOrderKey = 'active-order'
export const orderHistoryKey = 'order-history'
export const activeOrderItemKey = 'active-order-item'

export function useOrdersHistoryByUserIdQuery(
  userId?: string,
  options: UseQueryOptions<IOrder[]> = {}
): UseQueryResult<IOrder[]> {
  const queryClient = useQueryClient()

  return useQuery({
    enabled: !!userId,
    queryKey: [orderHistoryKey],
    queryFn: async () => {
      const ordersRef = collection(db, ordersKey)
      const q = query(ordersRef, where('placementTimestamp', '!=', null), where('userId', '==', userId))
      const orders = await getDocs(q)
      return orders.docs.map((order) => ({ id: order.id, ...order.data() } as IOrder))
    },
    onSuccess(data: IOrder[]) {
      for (const order of data) {
        queryClient.setQueryData([ordersKey, { id: order.id }], order)
      }
    },
    ...options,
  })
}

export function useOrderByIdQuery(
  orderId?: string,
  options: UseQueryOptions<IOrder | null> = {}
): UseQueryResult<IOrder | null> {
  return useQuery({
    enabled: !!orderId,
    notifyOnChangeProps: 'tracked',
    queryKey: [ordersKey, { id: orderId }],
    queryFn: async () => {
      const orderRef = doc(db, ordersKey, orderId as string)
      const order = await getDoc(orderRef)
      return order?.id ? ({ id: order.id, ...order.data() } as IOrder) : null
    },
    ...options,
  })
}

export function useActiveOrderByUserIdQuery(
  userId?: string,
  options: UseQueryOptions<IOrder | null> = {}
): UseQueryResult<IOrder | null> {
  const queryClient = useQueryClient()

  return useQuery({
    enabled: !!userId,
    cacheTime: 0,
    notifyOnChangeProps: 'tracked',
    queryKey: [activeOrderKey],
    queryFn: async () => {
      const ordersRef = collection(db, ordersKey)
      const q = query(ordersRef, where('placementTimestamp', '==', null), where('userId', '==', userId))
      const orders = await getDocs(q)
      const order = orders.docs.find((_, idx) => idx === 0)
      return order?.id ? ({ id: order.id, ...order.data() } as IOrder) : null
    },
    onSuccess(data: IOrder | null) {
      if (data?.items.length) {
        for (const item of data.items) {
          queryClient.setQueryData([activeOrderItemKey, { id: item.id }], item)
        }
      }
    },
    ...options,
  })
}

export function useOrderItemByIdQuery(
  orderId: string,
  orderItemId: string,
  options: UseQueryOptions<IOrderItem | null> = {}
): UseQueryResult<IOrderItem | null> {
  return useQuery({
    enabled: !!(orderItemId && orderId),
    staleTime: Infinity,
    notifyOnChangeProps: 'tracked',
    queryKey: [activeOrderItemKey, { id: orderItemId }],
    queryFn: async () => {
      const orderRef = doc(db, ordersKey, orderId)
      const order = await getDoc(orderRef)
      return order?.data()?.items?.length
        ? order.data()?.items.find((item: IOrderItem) => item.id === orderItemId) ?? null
        : null
    },
    ...options,
  })
}

export function useCreateOrder(
  options: UseMutationOptions<IOrder, FirebaseError, Omit<IOrder, 'id'>> = {}
): UseMutationResult<IOrder, FirebaseError, Omit<IOrder, 'id'>> {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: Omit<IOrder, 'id'>) {
      const ordersRef = collection(db, ordersKey)
      const orderRef = await addDoc(ordersRef, data)
      const order = await getDoc(orderRef)
      return { id: order.id, ...order.data() } as IOrder
    },
    onSuccess(data: IOrder) {
      queryClient.setQueryData([activeOrderKey], data)
    },
    ...options,
  })
}

export function useUpdateOrder(
  options: UseMutationOptions<IOrder, FirebaseError, { data: IOrder }> = {}
): UseMutationResult<IOrder, FirebaseError, { data: IOrder }> {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ data }) {
      const { id, ...orderProps } = data
      const orderRef = doc(db, ordersKey, data.id)
      await updateDoc(orderRef, orderProps as Omit<IOrder, 'id'>)
      const order = await getDoc(orderRef)
      return { id: order.id, ...order.data() } as IOrder
    },
    onSuccess(data: IOrder) {
      if (data?.placementTimestamp) {
        // remove active order from cash when it has placementTimestamp
        queryClient.removeQueries([activeOrderKey])
        // update order by id cash
        queryClient.setQueryData([ordersKey, { id: data.id }], data)
      } else {
        // update active order cash
        queryClient.setQueryData([activeOrderKey], data)
        // remove inactive order items cash
        queryClient.removeQueries([activeOrderItemKey], { inactive: true })
        // update active order cached order items
        if (data?.items.length) {
          for (const item of data.items) {
            queryClient.setQueryData([activeOrderItemKey, { id: item.id }], item)
          }
        }
      }
    },
    ...options,
  })
}

export function useDeleteOrder(
  options: UseMutationOptions<void, FirebaseError, { orderId: string }> = {}
): UseMutationResult<void, FirebaseError, { orderId: string }> {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ orderId }) {
      const orderRef = doc(db, ordersKey, orderId)
      await deleteDoc(orderRef)
    },
    onSuccess() {
      queryClient.removeQueries([activeOrderKey])
      queryClient.removeQueries([activeOrderItemKey])
    },
    ...options,
  })
}
