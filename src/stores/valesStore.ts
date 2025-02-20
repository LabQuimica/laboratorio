import { create } from "zustand";

// Tipos importados
import { StatusChange, CommentChange } from "@/types/ValeTypes";

interface StatusStore {
  statusChanges: StatusChange[]; 
  commentChanges: CommentChange[];

  addStatusChange: (change: StatusChange) => void; 
  addCommentChange: (change: CommentChange) => void; 

  clearStatusChanges: () => void; 
  clearCommentChanges: () => void; 
}

export const useStatusStore = create<StatusStore>((set) => ({
  statusChanges: [],
  commentChanges: [],

  addStatusChange: (change) =>
    set((state) => {
      // Filtrar cambios existentes para el mismo ID
      const filteredChanges = state.statusChanges.filter(
        (c) => c.id_vale !== change.id_vale
      );

      // Si el estado no cambió, eliminamos el cambio
      if (change.oldStatus === change.newStatus) {
        return { statusChanges: filteredChanges };
      }

      return { statusChanges: [...filteredChanges, change] };
    }),

  // Agregar un cambio de comentario
  addCommentChange: (change) =>
    set((state) => {
      // Filtrar cambios existentes para el mismo ID
      const filteredChanges = state.commentChanges.filter(
        (c) => c.id_vale !== change.id_vale
      );

      // Si el comentario no cambió, eliminamos el cambio
      if (change.oldObservation === change.newObservation) {
        return { commentChanges: filteredChanges };
      }

      return { commentChanges: [...filteredChanges, change] };
    }),

  clearStatusChanges: () => set({ statusChanges: [] }),
  clearCommentChanges: () => set({ commentChanges: [] }),
}));