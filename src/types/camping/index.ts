import type { ReactNode } from "react";

export interface ProtectedRouteProps {
  children: ReactNode
}

export interface Camping {
  id: string
  name: string
  address: string
  city: string
  state: string
  image: string
  rating: number
  price: number
}

export interface CampingCardProps {
  camping: Camping
}

export interface CampingDetailsInteface {
  id: string
  name: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  images: string[]
  rating: number
  totalReviews: number
  coordinates: {
    lat: number
    lng: number
  }
  prices: {
    motorcycle: number
    car: number
    van: number
    kiosk: number
    motorhome: number
  }
  amenities: {
    store: boolean
    bathrooms: boolean
    electricity: boolean
    motorhomeSupport: boolean
    wifi: boolean
    security: boolean
    restaurant: boolean
    playground: boolean
  }
  workingHours: {
    open: string
    close: string
    days: string
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  rules: string[]
}

