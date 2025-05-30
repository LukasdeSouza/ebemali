import type { Camping, CampingDetailsInteface } from "../types/camping";

export const mockCampings: Camping[] = [
  {
    id: '1',
    name: 'Camping Natureza Viva',
    address: 'Estrada da Serra, Km 15',
    city: 'Campos do Jordão',
    state: 'SP',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
    rating: 4.8,
    price: 85.00
  },
  {
    id: '2',
    name: 'Camping Águas Cristalinas',
    address: 'Rua das Cachoeiras, 200',
    city: 'Bonito',
    state: 'MS',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400',
    rating: 4.6,
    price: 120.00
  },
  {
    id: '3',
    name: 'Camping Montanha Azul',
    address: 'Trilha do Pico, s/n',
    city: 'Petrópolis',
    state: 'RJ',
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=400',
    rating: 4.7,
    price: 95.00
  },
  {
    id: '4',
    name: 'Camping Vale Verde',
    address: 'Fazenda Esperança, Zona Rural',
    city: 'São Bento do Sapucaí',
    state: 'SP',
    image: 'https://images.unsplash.com/photo-1496947850313-7743325cb014?w=400',
    rating: 4.5,
    price: 75.00
  },
  {
    id: '5',
    name: 'Camping Praia Selvagem',
    address: 'Av. Beira Mar, 1500',
    city: 'Florianópolis',
    state: 'SC',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    rating: 4.9,
    price: 140.00
  },
  {
    id: '6',
    name: 'Camping Cerrado Dourado',
    address: 'Estrada Real, Km 8',
    city: 'Pirenópolis',
    state: 'GO',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    rating: 4.4,
    price: 65.00
  }
]

export const mockCampingDetails: { [key: string]: CampingDetailsInteface } = {
    '1': {
      id: '1',
      name: 'Camping Natureza Viva',
      description: 'Um paraíso ecológico localizado na Serra da Mantiqueira, oferecendo uma experiência única de contato com a natureza. Nosso camping possui trilhas, cachoeiras próximas e uma vista deslumbrante das montanhas.',
      address: 'Estrada da Serra, Km 15',
      city: 'Campos do Jordão',
      state: 'SP',
      zipCode: '12460-000',
      images: [
        'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800',
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
        'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
      ],
      rating: 4.8,
      totalReviews: 127,
      coordinates: { lat: -22.7409, lng: -45.5954 },
      prices: {
        motorcycle: 45.00,
        car: 85.00,
        van: 120.00,
        kiosk: 200.00,
        motorhome: 150.00
      },
      amenities: {
        store: true,
        bathrooms: true,
        electricity: true,
        motorhomeSupport: true,
        wifi: true,
        security: true,
        restaurant: false,
        playground: true
      },
      workingHours: {
        open: '07:00',
        close: '22:00',
        days: 'Todos os dias'
      },
      contact: {
        phone: '(12) 3663-1234',
        email: 'contato@naturezaviva.com.br',
        website: 'www.naturezaviva.com.br'
      },
      rules: [
        'Check-in: 14:00 | Check-out: 12:00',
        'Silêncio após às 22:00',
        'Não é permitido som alto',
        'Animais de estimação são bem-vindos',
        'Proibido fazer fogueiras fora das áreas designadas',
        'Mantenha o local limpo e organize'
      ]
    },
    '2': {
      id: '2',
      name: 'Camping Águas Cristalinas',
      description: 'Localizado próximo às famosas águas cristalinas de Bonito, oferece uma experiência única com atividades aquáticas e ecoturismo. Perfeito para famílias e aventureiros.',
      address: 'Rua das Cachoeiras, 200',
      city: 'Bonito',
      state: 'MS',
      zipCode: '79290-000',
      images: [
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800'
      ],
      rating: 4.6,
      totalReviews: 89,
      coordinates: { lat: -21.1316, lng: -56.4784 },
      prices: {
        motorcycle: 60.00,
        car: 120.00,
        van: 160.00,
        kiosk: 280.00,
        motorhome: 200.00
      },
      amenities: {
        store: true,
        bathrooms: true,
        electricity: true,
        motorhomeSupport: true,
        wifi: false,
        security: true,
        restaurant: true,
        playground: false
      },
      workingHours: {
        open: '06:00',
        close: '23:00',
        days: 'Todos os dias'
      },
      contact: {
        phone: '(67) 3255-5678',
        email: 'info@aguascristalinas.com.br'
      },
      rules: [
        'Check-in: 15:00 | Check-out: 11:00',
        'Silêncio após às 23:00',
        'Animais permitidos com restrições',
        'Não é permitido pescar sem licença',
        'Respeite a fauna e flora local'
      ]
    }
  }