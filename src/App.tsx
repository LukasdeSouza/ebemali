import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LoginPage from './pages/login'
import { ProtectedRoute } from './pages/protected-routes'
import { CampingList } from './pages/protected-routes/campings'
import { CampingDetails } from './pages/protected-routes/campings/details'
import CampingRegistration from './pages/protected-routes/campings/registration'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas protegidas */}
          <Route 
            path="/campings" 
            element={
              <ProtectedRoute>
                <CampingList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/camping/:id" 
            element={
              <ProtectedRoute>
                <CampingDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/campings/registration" 
            element={
              <ProtectedRoute>
                <CampingRegistration />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirecionar para campings por padrão */}
          <Route 
            path="/" 
            element={<Navigate to="/campings" replace />} 
          />
          
          {/* Rota 404 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Página não encontrada</p>
                  <a 
                    href="/campings" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Voltar ao início
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App