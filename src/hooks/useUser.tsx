"use client"
import { User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const URL = process.env.NEXT_PUBLIC_API_URL;

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`http://${URL}/usuarios/getUsers`);
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