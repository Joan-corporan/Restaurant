import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Restaurant } from './Restaurant.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Restaurant />
  </StrictMode>
)
