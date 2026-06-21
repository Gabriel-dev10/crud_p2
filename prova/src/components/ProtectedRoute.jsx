import { Navigate } from 'react-router-dom'
import authService from '../api/authService'

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated && authService.isAuthenticated() ? children : <Navigate to="/login" />
}

export default ProtectedRoute
