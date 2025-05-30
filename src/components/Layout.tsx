
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div>
      {/* Cabeçalho com navegação */}
      <Navbar/>

      {/* Conteúdo da página */}
      <main>
        <Outlet />
      </main>

      {/* Rodapé */}
      <Footer/>
    </div>
  )
}

export default Layout