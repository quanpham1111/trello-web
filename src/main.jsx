//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
//cấu hình react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    {/* The rest of my application 1*/}
    <App />
    <ToastContainer position="bottom-left" theme="colored"/>
  </CssVarsProvider>
  //</React.StrictMode>
)
