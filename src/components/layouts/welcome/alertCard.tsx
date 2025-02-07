import React from "react";

interface ItemProps {
  id_item: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  marca: string;
}

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
      {/* Franja roja a la izquierda */}
      <div className="w-2 bg-red-500"></div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{item.nombre}</h3>
        <p className="text-sm text-gray-600">Tipo: {item.tipo}</p>
        <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
        <p className="text-sm text-gray-600">Marca: {item.marca}</p>
      </div>
    </div>
  );
};

export default ItemCard;
