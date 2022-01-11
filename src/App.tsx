import { useEffect, useState } from 'react'
import { IProduct } from './types'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
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
