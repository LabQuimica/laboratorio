"use client";

import { useState } from "react";

export default function Dashboard() {
  const [selectedTable, setSelectedTable] = useState("");
  const [originalData, setOriginalData] = useState([]); // Datos originales sin ordenar
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Estado de búsqueda
  const [sortField, setSortField] = useState(""); // Estado para el campo de ordenamiento
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Estado para dirección del ordenamiento

  // Definir los campos según la tabla seleccionada
  const tableFields: any = {
    ubicacion: ["id_ubicacion", "Mueble", "Numero", "Estado", "Estante", "Nivel"],
    kits: ["num_serie", "nombre", "marca", "fk_ubicacion", "observaciones", "link", "caja", "cantidad_kits", "contenido", "cantidad"],
    materiales: ["num_serie", "nombre", "marca", "fk_ubicacion"],
    reactivos_liquidos: ["num_cas", "nombre", "formula", "marca", "cantidad", "fk_ubicacion", "contenedor", "observaciones"]
  };

  // Obtener datos de la tabla seleccionada
  const fetchData = async (tableName: string) => {
    setError("");
    setData([]);
    setOriginalData([]);
    setSelectedTable(tableName);
    setSearchTerm(""); // Reiniciar búsqueda
    setSortField(""); // Reiniciar ordenamiento
    setSortOrder("asc");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${tableName}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setOriginalData(result); // Guardamos copia de los datos originales
      } else {
        setError(`Error al obtener los datos de ${tableName}`);
      }
    } catch (err) {
      setError(`No se pudo conectar con el servidor.`);
    }
  };

  // Manejar búsqueda (filtrar registros)
  const filteredData = data.filter((row: any) =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Función para ordenar datos
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === "asc"
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  // Manejar cambio de orden al hacer clic en el encabezado
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Función para resetear la tabla al orden original
  const resetTable = () => {
    setData(originalData);
    setSortField("");
    setSortOrder("asc");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      {/* Botones para seleccionar tabla */}
      <div className="flex gap-2 mb-4">
        {Object.keys(tableFields).map((table) => (
          <button key={table} onClick={() => fetchData(table)} className="border p-2">
            {table}
          </button>
        ))}
      </div>

      {/* Mostrar campo de búsqueda solo si hay una tabla seleccionada */}
      {selectedTable && (
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={resetTable} className="border p-2 bg-sky-400">
            Resetear Orden
          </button>
        </div>
      )}

      {/* Mostrar datos */}
      {error && <p className="text-red-500">{error}</p>}
      {selectedTable && <h2 className="text-lg font-semibold">Datos de {selectedTable}</h2>}

      <table className="border-collapse border w-full mt-2">
        <thead>
          <tr>
            {sortedData.length > 0 &&
              Object.keys(sortedData[0]).map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="border p-2 cursor-pointer"
                >
                  {key} {sortField === key ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row: any, index: number) => (
              <tr key={index} className="border">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border p-2">{value}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-2 text-center">No hay datos coincidentes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}