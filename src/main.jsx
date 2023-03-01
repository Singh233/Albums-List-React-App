import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import MouseContextProvider from './context/mouse-context.jsx'
import './styles/index.css'

import toast, { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>

    <Toaster toastOptions={{
        className: 'toast',
        // position: 'bottom-center',
        style: {
          border: '1px solid #efbf03',
          backgroundColor: 'black',
          color: '#efbf03',
          fontWeight: '600',
          textTransform: 'uppercase',
        },
      }}/>
    
  </React.StrictMode>,
)
