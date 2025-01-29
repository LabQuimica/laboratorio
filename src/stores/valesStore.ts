import { EstadoVale, StatusChange } from '@/types/types';
import { create } from 'zustand';

interface StatusStore {
  changes: StatusChange[];
  addChange: (change: StatusChange) => void;
  clearChanges: () => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
  changes: [],
  addChange: (change) =>
    set((state) => {
      // Si oldStatus y newStatus son iguales, eliminamos el cambio si ya existe
      if (change.oldStatus === change.newStatus) {
        const filteredChanges = state.changes.filter(c => c.id_vale !== change.id_vale);
        return {
          changes: filteredChanges,
        };
      }

      // Si oldStatus y newStatus son diferentes, actualizamos el cambio
      const filteredChanges = state.changes.filter(c => c.id_vale !== change.id_vale);
      return {
        changes: [...filteredChanges, change],
      };
    }),
  clearChanges: () => set({ changes: [] }),
}));