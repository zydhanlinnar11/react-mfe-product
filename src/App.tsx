import React, { useState, lazy, Suspense, Component } from 'react'
import clsx from 'clsx'

let CheckoutButton = <></>
try {
  // @ts-ignore
  CheckoutButton = lazy(() => import('react_mfe_checkout/Button'))
} catch (e) {
  console.log(e)
}

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

// const App = () => {
//   // const [selectedProductIndex, setSelectedProductIndex] = useState(0)

//   return (
//   )
// }

// export default App

type State = {
  selectedProductIndex: number
}

export default class App extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = { selectedProductIndex: 0 }
  }

  render() {
    const { selectedProductIndex } = this.state

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
                    onClick={() =>
                      this.setState({ selectedProductIndex: index })
                    }
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
                  {/* @ts-ignore */}
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
}
