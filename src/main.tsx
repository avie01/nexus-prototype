import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import DashboardHomePage from './pages/DashboardHomePage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import SearchesCreatedReport from './pages/SearchesCreatedReport.tsx'
import EmailsSavedReport from './pages/EmailsSavedReport.tsx'
import DocumentsCreatedReport from './pages/DocumentsCreatedReport.tsx'
import NewVersionsCreatedReport from './pages/NewVersionsCreatedReport.tsx'
import VirtualFilePartsReport from './pages/VirtualFilePartsReport.tsx'
import PhysicalFilePartsReport from './pages/PhysicalFilePartsReport.tsx'
import FilesCreatedReport from './pages/FilesCreatedReport.tsx'
import EditPrivilegesReport from './pages/EditPrivilegesReport.tsx'
import GlobalOverviewReport from './pages/GlobalOverviewReport.tsx'

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
        <Route path="/reports/searches-created" element={<AppLayout><SearchesCreatedReport /></AppLayout>} />
        <Route path="/reports/emails-saved" element={<AppLayout><EmailsSavedReport /></AppLayout>} />
        <Route path="/reports/documents-created" element={<AppLayout><DocumentsCreatedReport /></AppLayout>} />
        <Route path="/reports/new-versions-created" element={<AppLayout><NewVersionsCreatedReport /></AppLayout>} />
        <Route path="/reports/virtual-file-parts" element={<AppLayout><VirtualFilePartsReport /></AppLayout>} />
        <Route path="/reports/physical-file-parts" element={<AppLayout><PhysicalFilePartsReport /></AppLayout>} />
        <Route path="/reports/files-created" element={<AppLayout><FilesCreatedReport /></AppLayout>} />
        <Route path="/reports/edit-privileges" element={<AppLayout><EditPrivilegesReport /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
) 