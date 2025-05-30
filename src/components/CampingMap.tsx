import { useEffect } from 'react'

const CampingMap = ({ coordinates, name }: { coordinates: { lat: number, lng: number }, name: string }) => {
  useEffect(() => {
    // Carregar Leaflet dinamicamente
    const loadLeaflet = async () => {
      // Carregar CSS do Leaflet
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Carregar JS do Leaflet
      if (!window.L) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = initMap
        document.head.appendChild(script)
      } else {
        initMap()
      }
    }

    const initMap = () => {
      const mapElement = document.getElementById('camping-map')
      if (mapElement && window.L && !mapElement.hasChildNodes()) {
        const map = window.L.map('camping-map').setView([coordinates.lat, coordinates.lng], 15)

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        const customIcon = window.L.divIcon({
          html: `<div style="background: #fbbf24; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🏕️</div>`,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })

        window.L.marker([coordinates.lat, coordinates.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${name}</b><br/>Localização do camping`)
          .openPopup()
      }
    }

    loadLeaflet()
  }, [coordinates, name])

  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-gray-200">
      <div id="camping-map" className="w-full h-full"></div>
    </div>
  )
}

export default CampingMap