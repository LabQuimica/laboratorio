"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import AlertaInventario from "./alertCard";
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
      <AlertaInventario items={items || ([] as any)} />
    </div>
  );
};

export default ItemsAlertList;
