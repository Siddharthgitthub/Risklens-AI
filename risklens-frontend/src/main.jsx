import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// 🔥 wrap whole app with bebas font
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="font-bebas">
      <App />
    </div>
  </React.StrictMode>,
)
