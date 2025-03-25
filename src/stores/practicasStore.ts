import { StatusChange } from "@/types/PracticaTypes";
import { create } from "zustand";

interface PracticaState {
    nombre: string;
    descripcion: string;
    numEquipos: number;
    
    statusChanges: StatusChange[];

    setNombre: (nombre: string) => void;
    setDescripcion: (descripcion: string) => void;
    setNumEquipos: (numEquipos: number) => void;

    addStatusChange: (change: StatusChange) => void;
    clearStatusChanges: () => void;
    removeStatusChangeById: (id: number) => void;
}

export const usePracticaStore = create<PracticaState>((set) => ({
    nombre: '',
    descripcion: '',
    numEquipos: 1,
    statusChanges: [],
    setNombre: (nombre) => set({ nombre }),
    setDescripcion: (descripcion) => set({ descripcion }),
    setNumEquipos: (numEquipos) => set({ numEquipos }),

    addStatusChange: (change) =>
        set((state) => {
          // Filtrar cambios existentes para el mismo ID
          const filteredChanges = state.statusChanges.filter(
            (c) => c.id_practica !== change.id_practica
          );
          if (change.oldStatus === change.newStatus) {
            return { statusChanges: filteredChanges };
          }
    
          return { statusChanges: [...filteredChanges, change] };
    }),

    clearStatusChanges: () => set({ statusChanges: [] }),

    removeStatusChangeById: (id) =>
        set((state) => ({
          statusChanges: state.statusChanges.filter((change) => change.id_practica !== id),
        })),
}));
