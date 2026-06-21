import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import authService from './api/authService'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Resources from './pages/Resources'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated())
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={() => setIsAuthenticated(false)} />}
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        } />
        
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Users />
          </ProtectedRoute>
        } />
        
        <Route path="/recursos" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Resources />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
