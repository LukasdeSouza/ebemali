import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { FormDataLogin } from '../../types/form-datas'
import { useAuth } from '../../context/AuthContext'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState<FormDataLogin>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/campings'
    navigate(from, { replace: true })
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Lógica de Login
        if (!formData.email || !formData.password) {
          throw new Error('Email e senha são obrigatórios')
        }

        // Simular validação de credenciais
        const validUsers = [
          { email: 'admin@ebemali.com', password: '123456', name: 'Administrador' },
          { email: 'user@ebemali.com', password: 'password', name: 'João Silva' },
          { email: 'test@ebemali.com', password: '123', name: 'Usuário Teste' }
        ]

        const user = validUsers.find(u =>
          u.email === formData.email && u.password === formData.password
        )

        if (!user) {
          throw new Error('Email ou senha incorretos')
        }

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1500))

        await login(formData.email, formData.password)

        // Redirecionar para página de origem ou campings
        const from = location.state?.from?.pathname || '/campings'
        navigate(from, { replace: true })

      } else {
        // Lógica de Cadastro
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error('Todos os campos são obrigatórios')
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem')
        }

        if (formData.password.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres')
        }

        // Simular cadastro
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Após cadastro, fazer login automaticamente
        await login(formData.email, formData.password)
        navigate('/campings', { replace: true })
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Implementar lógica de login com Google
    console.log('Google login clicked')
  }

  const handleFacebookLogin = () => {
    // Implementar lógica de login com Facebook
    console.log('Facebook login clicked')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-8">
            <img
              src="/logo.png"
              alt="Ben Jali"
              className="h-12 w-12 rounded-full"
            />
            <span className="ml-3 text-2xl font-bold text-white">
              É BEM <span className="text-yellow-400">ALI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
          </h2>
          <p className="mt-2 text-gray-400">
            {isLogin
              ? 'Acesse milhares de campings em todo o Brasil'
              : 'Comece a explorar os melhores campings gratuitamente'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10"
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10"
                placeholder="Sua senha"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
              >
                {isLogin ? 'Entrar' : 'Criar Conta Gratuita'}
              </button>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            )}
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-yellow-600 hover:text-yellow-500"
              >
                {isLogin ? 'Cadastre-se gratuitamente' : 'Faça login'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.85 2.22c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={handleFacebookLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Terms */}
          {!isLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Ao criar uma conta, você concorda com nossos{' '}
                <a href="#" className="text-yellow-600 hover:text-yellow-500">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-yellow-600 hover:text-yellow-500">
                  Política de Privacidade
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage