import React, { useState, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'

import './index.scss'

// @ts-ignore
const CheckoutButton = lazy(() => import('react_mfe_checkout/Button'))
// @ts-ignore
const CheckoutBasket = lazy(() => import('react_mfe_checkout/Basket'))

// @ts-ignore
const RelatedProducts = lazy(() => import('react_mfe_inspire/RelatedProducts'))

const products = [
  {
    id: 1,
    name: 'Tractor Porsche-Diesel Master 419',
    img: 'https://micro-frontends.org/1-composition-client-only/team-red/images/tractor-red.jpg',
  },
  {
    id: 2,
    name: 'Tractor Fendt F20 Dieselroß',
    img: 'https://micro-frontends.org/1-composition-client-only/team-red/images/tractor-green.jpg',
  },
  {
    id: 3,
    name: 'Tractor Eicher Diesel 215/16',
    img: 'https://micro-frontends.org/1-composition-client-only/team-red/images/tractor-blue.jpg',
  },
]

const App = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)

  return (
    <div className="flex justify-center mt-8 gap-x-12">
      <div>
        <h1 className="text-xl font-bold">The Model Store</h1>
        <div className="flex">
          <img
            src={products[selectedProductIndex].img}
            alt={`Photo of ${products[selectedProductIndex].name}`}
            width="400"
            height="400"
          />
          <div className="my-auto">
            <p className="text-lg">{products[selectedProductIndex].name}</p>
            <div className="flex mb-8">
              {products.map((product, index) => (
                <a
                  href="#"
                  key={product.id}
                  onClick={() => setSelectedProductIndex(index)}
                  className={clsx(
                    index === selectedProductIndex
                      ? 'border-b-2 border-green-600'
                      : ''
                  )}
                >
                  <img
                    src={product.img}
                    alt={`Photo of ${product}`}
                    width="96"
                    height="96"
                  />
                </a>
              ))}
            </div>
            <Suspense fallback={'Loading...'}>
              <div className="flex gap-x-8 items-center">
                <CheckoutButton itemId={products[selectedProductIndex].id} />
                <CheckoutBasket />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">Related Products</h2>
        <Suspense fallback={'Loading...'}>
          <RelatedProducts />
        </Suspense>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('app'))
