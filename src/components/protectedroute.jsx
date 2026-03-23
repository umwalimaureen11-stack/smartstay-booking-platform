import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // We'll replace this with real auth later
  const isLoggedIn = localStorage.getItem('user')

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute