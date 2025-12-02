import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardHomePage from './pages/DashboardHomePage.tsx'

import AppLayout from './components/layout/AppLayout.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><DashboardHomePage /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><DashboardHomePage /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) 