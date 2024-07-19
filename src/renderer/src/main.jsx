import './assets/main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from './components/Login'
import { AlarmaLista } from './components/AlarmaLista'
import { BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'

import io from 'socket.io-client'

//const socket = io("/")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alarma-lista" element={<AlarmaLista />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
