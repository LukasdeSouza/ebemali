// src/data/campingsDB.ts
import { mockCampingDetails } from "../mocks";
import type { CampingDetailsInteface } from "../types/camping";

// Seus dados iniciais (pode ser um array vazio também)
const initialData: CampingDetailsInteface[] = [
  ...Object.values(mockCampingDetails)
];

let campingsData: CampingDetailsInteface[] = [...initialData];

export const db = {
  // CREATE - Adicionar novo camping
  create: (camping: Omit<CampingDetailsInteface, 'id'>): CampingDetailsInteface => {
    const newCamping = {
      ...camping,
      id: Date.now().toString()
    };
    campingsData.push(newCamping);
    return newCamping;
  },

  // READ - Obter todos os campings
  findAll: (): CampingDetailsInteface[] => {
    return [...campingsData];
  },

  // READ - Obter um camping por ID
  findById: (id: string): CampingDetailsInteface | undefined => {
    return campingsData.find(c => c.id === id);
  },

  // UPDATE - Atualizar um camping
  update: (id: string, updates: Partial<CampingDetailsInteface>): CampingDetailsInteface | undefined => {
    const index = campingsData.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    
    campingsData[index] = { ...campingsData[index], ...updates };
    return campingsData[index];
  },

  // DELETE - Remover um camping
  delete: (id: string): boolean => {
    const initialLength = campingsData.length;
    campingsData = campingsData.filter(c => c.id !== id);
    return campingsData.length !== initialLength;
  },

  // Método para resetar os dados (útil para testes)
  reset: (): void => {
    campingsData = [...initialData];
  }
};