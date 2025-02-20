import React from "react";

interface ItemProps {
  id_item: number;
  nombre: string;
  cantidad: number;
  marca: string;
}

const getFranjaColor = (cantidad: number): string => {
  if (cantidad < 30) return "bg-red-500"; // Ajustar los porcentajes/cantidads
  if (cantidad < 60) return "bg-yellow-500"; // Ajustar los porcentajes/cantidads
  return "bg-green-500"; 
};

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <div className="flex hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl">
      {/* Franja de color */}
      <div className={`w-3 ${getFranjaColor(item.cantidad)}`}></div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-200">Id:{item.id_item} {item.nombre}</h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">Cantidad: {item.cantidad}</p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">Marca: {item.marca}</p>
      </div>
    </div>
  );
};

export default ItemCard;
