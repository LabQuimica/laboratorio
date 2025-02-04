"use client";
import { Input } from "@/components/ui/input";

interface TableControlsProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  filteredRowCount: number;
  totalRowCount: number;
  filterComponent?: React.ReactNode; // Componente de filtros personalizado
}

export const TableControls = ({
  globalFilter,
  setGlobalFilter,
  filteredRowCount,
  totalRowCount,
  filterComponent,
}: TableControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {/* Barra de búsqueda */}
        <Input
          placeholder="Buscar..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm border-gray-300"
        />

        {/* Componente de filtros personalizado */}
        {filterComponent}
      </div>

      {/* Información de filas mostradas */}
      <div className="text-sm text-gray-700 dark:text-white">
        Mostrando {filteredRowCount} de {totalRowCount} filas
      </div>
    </div>
  );
};
