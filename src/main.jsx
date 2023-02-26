import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import MouseContextProvider from './context/mouse-context.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>
    
  </React.StrictMode>,
)
