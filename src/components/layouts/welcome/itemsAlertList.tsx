"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./alertCard";

const URL = process.env.NEXT_PUBLIC_API_URL;

interface Item {
  id_item: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  marca: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`http://localhost:1234/alerts/getItemsAlert`) // Cambia la URL a la de tu API
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <ItemCard key={item.id_item} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
