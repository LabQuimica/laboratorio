"use client"
import { User } from '@/types/userTypes';
import { useQuery } from '@tanstack/react-query';

const URL = process.env.NEXT_PUBLIC_API_URL;

console.log('La URL que se supone esta recibiendo:', URL);

const fetchItemsAlert = async (): Promise<User[]> => {
  const response = await fetch(`http://${URL}/itemsAlert/getItemsAlert`,{
    // mode: 'no-cors',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useItemsAlert = () => {
  return useQuery<User[], Error>({
    queryKey: ['itemsAlert'],
    queryFn: fetchItemsAlert,
  });
};