import { rest } from 'msw'
import { collection, getDocs, addDoc } from 'firebase/firestore'

import { db } from './firebase'
import seeds from './seeds.json'

const productsRef = collection(db, 'products')

export const handlers = [
  rest.get('/api/products', async (req, res, ctx) => {
    try {
      let products = await getDocs(productsRef)

      // add seed data to db if db is empty
      if (products.docs.length === 0) {
        for (const item of seeds) {
          await addDoc(productsRef, item)
        }
        // get products after seeding the db
        products = await getDocs(productsRef)
      }

      return res(ctx.status(200), ctx.json(products.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
    } catch (err) {
      return res(ctx.status(500), ctx.json({ message: (err as Error)?.message ?? 'Unknown error!' }))
    }
  }),
]
