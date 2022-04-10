import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

// @ts-ignore
const CheckoutButton = lazy(() => import('react_mfe_checkout/Button'))

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: react-mf-product</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <Suspense fallback={<div>Loading</div>}>
      <CheckoutButton />
    </Suspense>
  </div>
)
ReactDOM.render(<App />, document.getElementById('app'))
