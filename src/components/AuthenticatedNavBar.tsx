import { Link } from 'react-router-dom'
import type { User } from '../types/user'

const AuthenticatedNavBar = ({ user, logout }: { user: User | null, logout: () => void }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/logo.jpeg"
              alt="Ben Jali"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-3 text-xl font-bold text-gray-900">
              É BEM <span className="text-yellow-400">ALI</span>
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <Link to="/campings" className="text-gray-700 font-semibold hover:text-yellow-500 transition-colors">
              Campings
            </Link>
            <Link to="/videos" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Vídeos
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Olá, <b>{user?.name}</b></span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthenticatedNavBar