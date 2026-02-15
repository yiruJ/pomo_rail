import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SceneRoot from './pages/SceneRoot'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SceneRoot />
  </StrictMode>,
)
