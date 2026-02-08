import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Classrooms from './pages/Classrooms'
import FacultyCourses from './pages/FacultyCourses'
import Scheduling from './pages/Scheduling'
import Conflicts from './pages/Conflicts'
import CalendarView from './pages/CalendarView'
import { AuthProvider, AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function Shell(){
  const { user } = useContext(AuthContext)

  if(!user){
    return (
      <div className="container" style={{maxWidth:1024}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="app-layout">
        <Sidebar />
        <div className="main-shell">
          <div className="surface-panel">
            <Navbar />
          </div>
          <main className="surface-panel">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/classrooms" element={<ProtectedRoute><Classrooms /></ProtectedRoute>} />
              <Route path="/faculty" element={<ProtectedRoute><FacultyCourses /></ProtectedRoute>} />
              <Route path="/scheduling" element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
              <Route path="/conflicts" element={<ProtectedRoute><Conflicts /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}
