"use client"
import { fetchAllVales, fetchVales } from '@/services/valeService';
import { Vale } from '@/types/ValeTypes';
import { useQuery } from '@tanstack/react-query';

interface ValesParams {
  status?: string;
}

export const useVales = (params?: ValesParams) => {
  return useQuery<Vale[], Error>({
    queryKey: ['vales', params],
    queryFn: () => fetchVales(params),
  });
};

export const useAllVales = () => {
  return useQuery<Vale[], Error>({
    queryKey: ['vales'],
    queryFn: () => fetchAllVales(),
  });
};