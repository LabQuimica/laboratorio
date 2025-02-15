import { Vale } from "@/types/ValeTypes";

interface ValesParams {
    status?: string;
  }

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchVales = async (params?: ValesParams): Promise<Vale[]> => {
  const queryParams = params?.status ? `?estado=${params.status}` : '';
  console.log("solicitud de vales", queryParams);
  const response = await fetch(`http://${URL}/vales/getValesStatus${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchAllVales = async (): Promise<Vale[]> => {
  console.log("solicitud de all Vales", );
  const response = await fetch(`http://${URL}/vales/getVales`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};