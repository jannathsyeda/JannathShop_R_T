import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Page from './Page'
import { CartProvider } from './context/CartProvider'

function App() {

  return (
    <CartProvider>
      <Page/>
    </CartProvider>
  )
}

export default App
