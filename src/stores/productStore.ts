import { collection, getDocs } from 'firebase/firestore'
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query'

import { db } from '../firebase'
import { IProduct } from '../types'

export const productsKey = 'products'

export function useProductsQuery(options: UseQueryOptions<IProduct[]> = {}): QueryObserverResult<IProduct[]> {
  return useQuery({
    staleTime: 0,
    queryKey: [productsKey],
    queryFn: async () => {
      const productsRef = collection(db, productsKey)
      const products = await getDocs(productsRef)
      return products.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IProduct))
    },
    ...options,
  })
}
