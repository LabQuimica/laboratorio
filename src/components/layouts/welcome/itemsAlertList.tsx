"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "./alertCard";
import { fetchItemsAlert } from "../../../services/fetchItems";
import { ItemAlert } from "../../../types/itemTypes";

const ItemsAlertList: React.FC = () => {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery<ItemAlert[], Error>({
    queryKey: ["itemsAlert"],
    queryFn: fetchItemsAlert,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Hubo un error al cargar los datos.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-2 text-neutral-700 dark:text-neutral-200">
        Alertas de material
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item, index) => (
          <ItemCard key={item.id_item || `item-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsAlertList;
