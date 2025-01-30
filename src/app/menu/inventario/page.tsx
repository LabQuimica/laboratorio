"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Definir tipo de datos
type Item = {
  id_item: number;
  fk_marca_item: number;
  num_serie: string;
  nombre: string;
  tipo: "kits" | "sensores" | "materiales" | "liquidos" | "solidos";
  ubicacion: string;
  cantidad: number;
  observacion: string;
}

export default function ItemsTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  // Cargar ítems desde el backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/items");
        setItems(res.data);
      } catch (error) {
        console.error("Error cargando ítems:", error);
      }
    };

    fetchItems();
  }, []);

  // Manejar selección de checkbox
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Seleccionar/Deseleccionar todos los ítems
  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === items.length ? [] : items.map((i) => i.id_item));
  };

  // Eliminar ítems seleccionados
  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:5000/delete-items", { ids: selectedItems });
      setItems((prev) => prev.filter((item) => !selectedItems.includes(item.id_item)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Error eliminando ítems:", error);
    }
  };

  // Manejar edición
  const handleEdit = (item: Item) => {
    setEditItem(item);
  };

  // Actualizar ítem
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editItem) return;

    try {
      await axios.put("http://localhost:5000/update-item", editItem);
      setItems((prev) => prev.map((item) => (item.id_item === editItem.id_item ? editItem : item)));
      setEditItem(null);
    } catch (error) {
      console.error("Error actualizando ítem:", error);
    }
  };

  return (
    <div className="p-4 bg-light-bg dark:bg-dark-bg dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Gestión de Ítems</h1>

      {/* Tabla de Ítems */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedItems.length === items.length && items.length > 0}
              />
            </th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id_item} className="border-b bg-light-bg dark:bg-dark-bg dark:text-white">
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelectItem(item.id_item)}
                  checked={selectedItems.includes(item.id_item)}
                />
              </td>
              <td>{item.id_item}</td>
              <td>{item.nombre}</td>
              <td>{item.tipo}</td>
              <td>{item.ubicacion}</td>
              <td>{item.cantidad}</td>
              <td>
                <button
                  className="bg-yellow-500 px-2 py-1 text-white rounded mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón de eliminación */}
      {selectedItems.length > 0 && (
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Eliminar Seleccionados
        </button>
      )}

      {/* Formulario de edición */}
      {editItem && (
        <form className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded" onSubmit={handleUpdate}>
          <h2 className="text-xl font-bold mb-2">Editar Ítem</h2>

          <label className="block text-sm">Nombre:</label>
          <input
            className="w-full p-2 mb-2 rounded border"
            value={editItem.nombre}
            onChange={(e) => setEditItem({ ...editItem, nombre: e.target.value })}
          />

          <label className="block text-sm">Ubicación:</label>
          <input
            className="w-full p-2 mb-2 rounded border"
            value={editItem.ubicacion}
            onChange={(e) => setEditItem({ ...editItem, ubicacion: e.target.value })}
          />

          <label className="block text-sm">Cantidad:</label>
          <input
            type="number"
            className="w-full p-2 mb-2 rounded border"
            value={editItem.cantidad}
            onChange={(e) => setEditItem({ ...editItem, cantidad: parseFloat(e.target.value) })}
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
}
