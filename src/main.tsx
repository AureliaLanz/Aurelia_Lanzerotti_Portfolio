import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import { AppSSOAuth } from './auth/AppSSOAuth.tsx'
import './styles/reset.css'
import './styles/tokens.css'
import './styles/global.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppSSOAuth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppSSOAuth>
  </StrictMode>,
)
