import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and company info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="Ben Jali" 
                className="h-12 w-12 rounded-full"
              />
              <span className="ml-3 text-2xl font-bold">
                É BEM <span className="text-yellow-400">ALI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Transformando ideias em soluções digitais inovadoras. 
              Desenvolvemos experiências únicas que conectam pessoas e tecnologia.
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297L3.74 16.73c.84.84 2.012 1.297 3.326 1.297 2.583 0 4.67-2.088 4.67-4.67S11.649 8.687 9.066 8.687c-1.297 0-2.448.49-3.326 1.297l1.383 1.383c.84-.84 2.012-1.297 3.326-1.297 2.583 0 4.67 2.088 4.67 4.67s-2.087 4.67-4.67 4.67zm7.404-1.383c-.84.84-2.012 1.297-3.326 1.297-2.583 0-4.67-2.088-4.67-4.67s2.087-4.67 4.67-4.67c1.297 0 2.448.49 3.326 1.297l1.383-1.383c-.84-.84-2.012-1.297-3.326-1.297-2.583 0-4.67 2.088-4.67 4.67s2.087 4.67 4.67 4.67c1.297 0 2.448-.49 3.326-1.297l-1.383-1.383z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <svg className="h-4 w-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                contato@codetech.software
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <svg className="h-4 w-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                +55 (34) 99999-9999
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} É Bem Ali. Todos os direitos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer