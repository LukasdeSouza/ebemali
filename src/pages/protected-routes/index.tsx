import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/Footer'
import AuthenticatedNavBar from '../../components/AuthenticatedNavBar'

interface ProtectedRouteProps {
  children: ReactNode
}


export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, logout, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>
    <AuthenticatedNavBar user={user} logout={logout}/>
    {children}
    <Footer/>
  </>
}