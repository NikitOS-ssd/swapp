import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProviders } from '@/app/providers'
import App from './App'
import '@/pwa'
import '@/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
