import React from "react";
import { IconBucketDroplet } from '@tabler/icons-react';

interface ItemProps {
  id_item: number;
  nombre: string;
  cantidad: number;
  marca: string;
}

const getFranjaColor = (cantidad: number): string => {  //Idealmente debe ser al 20% 
  if (cantidad < 30) return "bg-red-500"; // Ajustar los porcentajes/cantidads
  if (cantidad < 60) return "bg-yellow-500"; // Ajustar los porcentajes/cantidads
  return "bg-green-500"; 
};

// const getIcon = (tipo: string): string => {
//   if (tipo === "solidos") return <IconBucketDroplet stroke={1} />;
//   if (tipo === "liquidos") return "beaker";
//   return "box";
// }

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <div className="flex hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl">
      {/* Franja de color */}
      <div className={`w-2 ${getFranjaColor(item.cantidad)}`}></div>

      {/* Contenido de la tarjeta: Nombre y cantidad */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-200">{item.nombre}</h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">Cantidad: {item.cantidad}</p>
      </div>
    </div>
  );
};

export default ItemCard;
