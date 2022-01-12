import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { db } from './firebase'
import { IProduct } from './types'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    async function init() {
      const productsRef = collection(db, 'products')
      const products = await getDocs(productsRef)
      setProducts(products.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IProduct)))
    }
    init().finally()
  }, [])

  return (
    <div>
      <h2>Menu:</h2>
      {products.map((p) => (
        <div key={p.id}>
          <img src={p?.image} alt={p.type} />
          <h4>{p.type}</h4>
          <p>{p.description}</p>
          <p>Price:{p.price}</p>
        </div>
      ))}
    </div>
  )
}

export default App
