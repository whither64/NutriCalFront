import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from "./contexts/AppContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </AuthProvider>
  </React.StrictMode>
)
