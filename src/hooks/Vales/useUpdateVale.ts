import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusChange } from '@/types/ValeTypes';

const URL = process.env.NEXT_PUBLIC_API_URL;

interface UpdateValeDTO {
  id_vale: number;
  newStatus: string;
}

// Función para transformar los datos al formato requerido
const transformChangesForAPI = (changes: StatusChange[]): UpdateValeDTO[] => {
  return changes.map(({ id_vale, newStatus }) => ({
    id_vale,
    newStatus
  }));
};

const updateVales = async (changes: UpdateValeDTO[]): Promise<void> => {
  console.log('changes', changes);

  const response = await fetch(`http://${URL}/vales/updateVales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error('Error actualizando los vales');
  }

  return response.json();
};

export const useUpdateVales = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (changes: StatusChange[]) => {
      const transformedData = transformChangesForAPI(changes);
      return updateVales(transformedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vales'] });
    },
  });
};