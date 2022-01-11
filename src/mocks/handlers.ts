import { rest } from 'msw'
import { collection, getDocs } from 'firebase/firestore'

import { db } from './firebase'

const productsRef = collection(db, 'products')

export const handlers = [
  rest.get('/api/products', async (req, res, ctx) => {
    try {
      const products = await getDocs(productsRef)
      return res(ctx.status(200), ctx.json(products.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
    } catch (err) {
      return res(ctx.status(500), ctx.json({ message: (err as Error)?.message ?? 'Unknown error!' }))
    }
  }),
]
