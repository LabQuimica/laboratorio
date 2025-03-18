// services/fetchItemsAlert.ts
import { ItemAlert } from "../types/itemTypes";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchItemsAlert = async (): Promise<ItemAlert[]> => {
  const response = await fetch(`http://${URL}/alerts/getItemsAlert`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  const data = await response.json();
  return data;
};