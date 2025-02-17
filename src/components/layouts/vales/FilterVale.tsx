import DropdownFilter from "@/components/table/DropdownFilter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface EstadoValeFilterProps {
  onFilterChange: (filters: ColumnFiltersState) => void;
}

export const EstadoValeFilter = ({ onFilterChange }: EstadoValeFilterProps) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const handleFiltersChange = (updatedFilters: ColumnFiltersState) => {
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex space-x-4">
      <DropdownFilter
        label="Filtrar por Estado Vale"
        filterId="estado_vale"
        filters={filters}
        onFilterChange={handleFiltersChange}
        options={[
          { label: "Todos", value: "" },
          { label: "Pendiente", value: "pendiente" },
          { label: "En progreso", value: "progreso" },
          { label: "Completada", value: "completada" },
          { label: "Cancelada", value: "cancelada" },
        ]}
      />
      <DropdownFilter
        label="Filtrar por Estado Práctica"
        filterId="estado_practica"
        filters={filters}
        onFilterChange={handleFiltersChange}
        options={[
          { label: "Todos", value: "" },
          { label: "Pendiente", value: "pendiente" },
          { label: "En progreso", value: "progreso" },
          { label: "Completada", value: "completada" },
          { label: "Cancelada", value: "cancelada" },
        ]}
      />
    </div>
  );
};
