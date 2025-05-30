import { useState, useEffect } from 'react'
import { CampingCard } from '../../../components/CampingCard'
import type { CampingDetailsInteface } from '../../../types/camping'
import { Link } from 'react-router-dom'
import { db } from '../../../data/campingsDB'

export const CampingList = () => {
  const [campings, setCampings] = useState<CampingDetailsInteface[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCampings, setFilteredCampings] = useState<CampingDetailsInteface[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simula um carregamento assíncrono
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = db.findAll(); // Usa o db fictício
        console.log('Campings carregados:', data);
        setCampings(data);
      } catch (error) {
        console.error('Erro ao carregar campings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filtered = campings.filter(camping =>
      camping?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camping?.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camping?.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCampings(filtered)
  }, [searchTerm, campings])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Descubra os Melhores Campings do Brasil
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Encontre o local perfeito para sua próxima aventura na natureza
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nome, cidade ou estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredCampings.length} camping{filteredCampings.length !== 1 ? 's' : ''} encontrado{filteredCampings.length !== 1 ? 's' : ''}
          </p>
          <Link to="/campings/registration">
            <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Adicionar Camping
            </button>
          </Link>
        </div>

        {/* Campings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampings.map((camping) => (
            <CampingCard key={camping.id} camping={camping} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCampings.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.072-2.33m-.928.68A7.954 7.954 0 0112 17.999c2.34 0 4.467-.881 6.072-2.33m0 0L21 21" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum camping encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente buscar por outros termos ou limpe os filtros.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}