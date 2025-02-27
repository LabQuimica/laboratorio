import { create } from "zustand";

interface PracticaState {
    nombre: string;
    descripcion: string;
    numEquipos: number;
    setNombre: (nombre: string) => void;
    setDescripcion: (descripcion: string) => void;
    setNumEquipos: (numEquipos: number) => void;
}

export const usePracticaStore = create<PracticaState>((set) => ({
    nombre: '',
    descripcion: '',
    numEquipos: 1,
    setNombre: (nombre) => set({ nombre }),
    setDescripcion: (descripcion) => set({ descripcion }),
    setNumEquipos: (numEquipos) => set({ numEquipos }),
}));
