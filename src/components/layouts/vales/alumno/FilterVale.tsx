import { semestre } from "@/constants/semestr";
import ComboboxFilter from "../../../table/ComboboxFilter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { grupos } from "@/constants/grupos";

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
      <ComboboxFilter
        label="Filtrar por Materia"
        placeholder="Buscar materia..."
        filterId="nombre"
        items={grupos}
        filters={filters}
        onFilterChange={handleFiltersChange}
      />
      <ComboboxFilter
        label="Filtrar por Semestre"
        placeholder="Buscar semestre..."
        filterId="semestre"
        items={semestre}
        filters={filters}
        onFilterChange={handleFiltersChange}
      />
    </div>
  );
};
