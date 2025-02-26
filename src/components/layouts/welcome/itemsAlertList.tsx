"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./alertCard";

interface Item {
  id_item: number;
  nombre: string;
  cantidad: number;
  marca: string;
}

const ItemsAlertList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:1234/alerts/getItemsAlert`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  if (loading) return <p>Cargando...</p>;
  // text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-2 text-neutral-700 dark:text-neutral-200">Alertas de material</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id_item} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsAlertList;
