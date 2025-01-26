"use client"
import { Vale } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const fetchVales = async (): Promise<Vale[]> => {
  const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/vales/getVales`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useVales = () => {
  return useQuery<Vale[], Error>({
    queryKey: ['vales'],
    queryFn: fetchVales,
  });
};