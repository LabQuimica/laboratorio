import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUnidad = (tipoItem: string) => {
  switch (tipoItem.toLowerCase()) {
    case "reactivos-solidos":
      return "g";
    case "reactivos-liquidos":
      return "mL";
    case "kits":
      return "und";
    case "sensores":
      return "und";
    default:
      return "";
  }
};