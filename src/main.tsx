import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import DashboardHomePage from './pages/DashboardHomePage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import GlobalOverviewReport from './pages/GlobalOverviewReport.tsx'
import UserReportsPage from './pages/UserReportsPage.tsx'
import WorkflowUsagePage from './pages/WorkflowUsagePage.tsx'
import FileReportsPage from './pages/FileReportsPage.tsx'
import DocumentReportsPage from './pages/DocumentReportsPage.tsx'
import AdminOverviewPage from './pages/AdminOverviewPage.tsx'

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
        <Route path="/reports/global-overview" element={<AppLayout><GlobalOverviewReport /></AppLayout>} />
        <Route path="/reports/privilege-reporting" element={<AppLayout><DashboardHomePage /></AppLayout>} />
        <Route path="/reports/user-reports" element={<AppLayout><UserReportsPage /></AppLayout>} />
        <Route path="/reports/workflow-usage" element={<AppLayout><WorkflowUsagePage /></AppLayout>} />
        <Route path="/reports/file-reports" element={<AppLayout><FileReportsPage /></AppLayout>} />
        <Route path="/reports/document-reports" element={<AppLayout><DocumentReportsPage /></AppLayout>} />
        <Route path="/reports/admin-overview" element={<AppLayout><AdminOverviewPage /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) 