import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardHomePage from './pages/DashboardHomePage.tsx'

import AppLayout from './components/layout/AppLayout.tsx'
import './index.css'
import GenericPage3 from './pages/GenericPage3.tsx'
import GenericPage2 from './pages/GenericPage2.tsx'
import GenericPage4 from './pages/GenericPage4.tsx'
import GenericPage5 from './pages/GenericPage5.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><DashboardHomePage /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><DashboardHomePage /></AppLayout>} />
        <Route path="/page2" element={<AppLayout><GenericPage2 /></AppLayout>} />
        <Route path="/page3" element={<AppLayout><GenericPage3 /></AppLayout>} />
        <Route path="/page4" element={<AppLayout><GenericPage4 /></AppLayout>} />
        <Route path="/page5" element={<AppLayout><GenericPage5 /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) 