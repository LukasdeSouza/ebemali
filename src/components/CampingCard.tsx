import { useNavigate } from "react-router-dom"
import type { CampingCardProps } from "../types/camping"

export const CampingCard = ({ camping }: CampingCardProps) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/camping/${camping.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleViewDetails}>
      <div className="relative">
        <img
          src={typeof camping.images === "object" ? camping.images[0] : ""}
          alt={camping.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm">
          ⭐ {camping.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {camping.name}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {camping.address}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {camping.city}, {camping.state}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-yellow-600">
            A partir de R$ {(camping.prices.car ?? 0).toFixed(2)}/noite
          </div>
          <button 
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}