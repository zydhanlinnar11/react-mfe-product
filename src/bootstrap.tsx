import React from 'react'
import { hydrate } from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
const container = document.getElementById('root')
import './styles.css'

if (!container) throw Error('container not found')

const root = hydrate(<App />, container)
