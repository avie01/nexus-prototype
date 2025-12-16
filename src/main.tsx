import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import DashboardHomePage from './pages/DashboardHomePage.tsx'
import AdminPage from './pages/AdminPage.tsx'

import AppLayout from './components/layout/AppLayout.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/home" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><DashboardHomePage /></AppLayout>} />
        <Route path="/admin" element={<AppLayout><AdminPage /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) 