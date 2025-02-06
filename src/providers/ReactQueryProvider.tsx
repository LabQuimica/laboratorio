import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recargar datos al cambiar de ventana
      staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
      retry: 1, // Número de reintentos en caso de error
    },
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b
