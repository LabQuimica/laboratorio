"use client"
import { User } from '@/types/userTypes';
import { useQuery } from '@tanstack/react-query';

const URL = process.env.NEXT_PUBLIC_API_URL;

console.log('La URL que se supone esta recibiendo:', URL);

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`http://${URL}/users/getUsers`,{
    // mode: 'no-cors',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};