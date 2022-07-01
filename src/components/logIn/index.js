import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LogIn from './LogIn'
import { AuthProvider } from './context/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <AuthProvider>
      <LogIn />
    </AuthProvider>
  </>
)
