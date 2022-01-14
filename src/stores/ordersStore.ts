import { collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore'
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
  UseMutationResult,
  UseMutationOptions,
  QueryObserverResult,
} from 'react-query'

import { db } from '../firebase'
import { IOrder } from '../types'

export const ordersKey = 'orders'
export const activeOrdersKey = 'active-orders'

export function useOrdersQuery(options: UseQueryOptions<IOrder[]> = {}): QueryObserverResult<IOrder[]> {
  return useQuery({
    staleTime: 0,
    queryKey: [ordersKey],
    queryFn: async () => {
      const ordersRef = collection(db, ordersKey)
      const orders = await getDocs(ordersRef)
      return orders.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IOrder))
    },
    ...options,
  })
}

export function useOrdersByUserIdQuery(
  userId: string,
  options: UseQueryOptions<IOrder[]> = {}
): QueryObserverResult<IOrder[]> {
  return useQuery({
    staleTime: 0,
    queryKey: [ordersKey, { userId }],
    queryFn: async () => {
      const ordersRef = collection(db, ordersKey)
      const q = query(ordersRef, where('userId', '==', userId))
      const orders = await getDocs(q)
      return orders.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IOrder))
    },
    ...options,
  })
}

export function useOrderByIdQuery(id: string, options: UseQueryOptions<IOrder>): UseQueryResult<IOrder> {
  return useQuery({
    staleTime: Infinity,
    notifyOnChangeProps: 'tracked',
    queryKey: [ordersKey, { id }],
    queryFn: async () => {
      const orderRef = doc(db, ordersKey, id)
      const order = await getDoc(orderRef)
      return { id: order.id, ...order.data() } as IOrder
    },
    ...options,
  })
}

export function useActiveOrderByUserIdQuery(
  userId: string,
  options: UseQueryOptions<IOrder | null>
): UseQueryResult<IOrder | null> {
  return useQuery({
    staleTime: Infinity,
    notifyOnChangeProps: 'tracked',
    queryKey: [activeOrdersKey, { userId }],
    queryFn: async () => {
      const ordersRef = collection(db, ordersKey)
      const q = query(ordersRef, where('placementDate', '==', null))
      const orders = await getDocs(q)
      const order = orders.docs.find((_, idx) => idx === 0)
      return order?.id ? ({ id: order.id, ...order.data() } as IOrder) : null
    },
    ...options,
  })
}

export function useUpdateOrder(
  options: UseMutationOptions<IOrder, unknown, IOrder> = {}
): UseMutationResult<IOrder, unknown, IOrder> {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: IOrder) {
      const { id, ...orderProps } = data
      const orderRef = doc(db, ordersKey, id)
      await setDoc(orderRef, orderProps)
      const order = await getDoc(orderRef)
      return { id: order.id, ...order.data() } as IOrder
    },
    onSuccess(data: IOrder) {
      queryClient.setQueryData([ordersKey, { id: data.id }], data)
    },
    ...options,
  })
}
