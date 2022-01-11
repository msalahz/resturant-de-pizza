import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div>
      <label htmlFor="products">Products:</label>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}

export default App
