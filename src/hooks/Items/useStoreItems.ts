import { create } from 'zustand';
import { Material, Kit, Sensor, Liquido, Solido } from '@/types/MaterialesTypes';

interface MaterialesState {
    kits: Kit[];
    sensores: Sensor[];
    liquidos: Liquido[];
    solidos: Solido[];
    error: string | null;
    
    addMaterial: (tipo: string, material: Material) => void;
    removeMaterial: (tipo: string, id: number) => void;
    updateMaterialQuantity: (tipo: string, id: number, change: number) => void;
    setError: (error: string | null) => void;
}

export const useStoreItems = create<MaterialesState>((set) => ({
    kits: [],
    sensores: [],
    liquidos: [],
    solidos: [],
    error: null,

    setError: (error) => set({ error }),

    addMaterial: (tipo, material) => set((state) => {
        const tipoKey = tipo as keyof Omit<MaterialesState, 'addMaterial' | 'removeMaterial' | 'updateMaterialQuantity'>;
        const existingMaterials = state[tipoKey] as Material[];

        const materialExiste = existingMaterials.some(m => m.id_item === material.id_item);

        if (materialExiste) return state;

        return {
            ...state,
            [tipoKey]: [...existingMaterials, { ...material, cantidadActual: "1" }],
        };
    }),

    removeMaterial: (tipo, id) => set((state) => {
        const tipoKey = tipo as keyof Omit<MaterialesState, 'addMaterial' | 'removeMaterial' | 'updateMaterialQuantity'>;
        const materialsArray = state[tipoKey] as Material[];
        
        return {
          ...state,
          [tipoKey]: materialsArray.filter(m => m.id_item !== id)
        };
    }),

    updateMaterialQuantity: (tipo, id, change) => {
        set((state) => {
          const tipoKey = tipo as keyof Omit<MaterialesState, 'addMaterial' | 'removeMaterial' | 'updateMaterialQuantity'>;
          const currentList = state[tipoKey] as Material[];

          const item = currentList.find(item => item.id_item === id);
          if (!item) return state;

          const cantidadMaxima = parseInt(item.cantidad);
          const cantidadActual = parseInt(item.cantidadActual || "1");
          const newQuantity = cantidadActual + change;

          if (newQuantity > cantidadMaxima) {
            return {
              ...state,
              error: `No es posible agregar esa cantidad. La cantidad máxima disponible es ${cantidadMaxima}`
            };
          }

          if (newQuantity < 1) {
            return {
              ...state,
              error: "La cantidad no puede ser menor a 1"
            };
          }

          return {
            ...state,
            error: null,
            [tipoKey]: currentList.map(item =>
              item.id_item === id
                ? { ...item, cantidadActual: newQuantity.toString() }
                : item
            ),
          };
        });
    },
}))