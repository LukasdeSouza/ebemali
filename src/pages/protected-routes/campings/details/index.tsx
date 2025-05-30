import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import CampingMap from "../../../../components/CampingMap"
import { useAuth } from "../../../../context/AuthContext"
import type { CampingDetailsInteface } from "../../../../types/camping"
import { mockCampingDetails } from "../../../../mocks"

export const CampingDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [camping, setCamping] = useState<CampingDetailsInteface | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      // Simular carregamento
      setTimeout(() => {
        const campingData = mockCampingDetails[id]
        setCamping(campingData || null)
        setLoading(false)
      }, 1000)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (!camping) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Camping não encontrado</h1>
          <Link to="/campings" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-md font-medium transition-colors">
            Voltar à listagem
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/campings" className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="é bem ali" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-3 text-xl font-bold text-gray-900">
                  É BEM <span className="text-yellow-400">ALI</span>
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.name}</span>
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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm">
            <Link to="/campings" className="text-yellow-600 hover:text-yellow-500">
              Campings
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{camping.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{camping.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">⭐</span>
              <span className="font-medium">{camping.rating}</span>
              <span className="ml-1">({camping.totalReviews} avaliações)</span>
            </div>
            <span>•</span>
            <span>{camping.city}, {camping.state}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <img
                src={camping.images[currentImageIndex]}
                alt={camping.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {camping.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${camping.name} - ${index + 1}`}
                  className={`w-full h-24 lg:h-44 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    currentImageIndex === index ? 'border-yellow-400' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre o Camping</h2>
              <p className="text-gray-700 leading-relaxed">{camping.description}</p>
            </div>

            {/* Contact & Hours */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contato e Funcionamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contato</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      {camping.contact.phone}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      {camping.contact.email}
                    </p>
                    {camping.contact.website && (
                      <p className="flex items-center">
                        <span className="mr-2">🌐</span>
                        <a href={`https://${camping.contact.website}`} className="text-yellow-600 hover:text-yellow-500">
                          {camping.contact.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Horário de Funcionamento</h3>
                  <div className="text-sm text-gray-600">
                    <p><strong>{camping.workingHours.days}</strong></p>
                    <p>{camping.workingHours.open} às {camping.workingHours.close}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Localização</h2>
              <div className="mb-4">
                <p className="text-gray-700">
                  {camping.address}, {camping.city} - {camping.state}, {camping.zipCode}
                </p>
              </div>
              <CampingMap coordinates={camping.coordinates} name={camping.name} />
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Regras e Informações</h2>
              <ul className="space-y-2">
                {camping.rules.map((rule, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="text-yellow-400 mr-2 mt-1">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Valores por Diária</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="flex items-center text-gray-700">
                    <span className="mr-2">🏍️</span>
                    Moto
                  </span>
                  <span className="font-semibold text-gray-900">R$ {camping.prices.motorcycle.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="flex items-center text-gray-700">
                    <span className="mr-2">🚗</span>
                    Carro
                  </span>
                  <span className="font-semibold text-gray-900">R$ {camping.prices.car.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="flex items-center text-gray-700">
                    <span className="mr-2">🚐</span>
                    Van
                  </span>
                  <span className="font-semibold text-gray-900">R$ {camping.prices.van.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="flex items-center text-gray-700">
                    <span className="mr-2">🏕️</span>
                    Quiosque
                  </span>
                  <span className="font-semibold text-gray-900">R$ {camping.prices.kiosk.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="flex items-center text-gray-700">
                    <span className="mr-2">🚌</span>
                    Motorhome
                  </span>
                  <span className="font-semibold text-gray-900">R$ {camping.prices.motorhome.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-4 rounded-md font-medium transition-colors">
                Fazer Reserva
              </button>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Comodidades</h2>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(camping.amenities).map(([key, available]) => {
                  const amenityLabels: { [key: string]: { label: string, icon: string } } = {
                    store: { label: 'Vendinha/Loja', icon: '🏪' },
                    bathrooms: { label: 'Banheiros', icon: '🚿' },
                    electricity: { label: 'Energia Elétrica', icon: '⚡' },
                    motorhomeSupport: { label: 'Suporte Motorhome', icon: '🔌' },
                    wifi: { label: 'Wi-Fi', icon: '📶' },
                    security: { label: 'Segurança 24h', icon: '🛡️' },
                    restaurant: { label: 'Restaurante', icon: '🍽️' },
                    playground: { label: 'Playground', icon: '🎠' }
                  }
                  
                  const amenity = amenityLabels[key]
                  if (!amenity) return null
                  
                  return (
                    <div key={key} className={`flex items-center p-2 rounded ${available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                      <span className="mr-3">{amenity.icon}</span>
                      <span className="text-sm">{amenity.label}</span>
                      <span className="ml-auto text-xs">
                        {available ? '✓' : '✗'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}