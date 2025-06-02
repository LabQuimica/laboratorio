import ComboboxFilter from "@/components/table/ComboboxFilter";
import { useGrupos } from "@/hooks/Groups/useGroups";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface GruposFilterProps {
  onFilterChange: (filters: ColumnFiltersState) => void;
}

export const GruposFilter = ({ onFilterChange }: GruposFilterProps) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const { data: grupos } = useGrupos();

  const semestres = Array.from(
    new Set(grupos?.map((grupo) => grupo.semestre))
  ).sort();

  const handleFiltersChange = (updatedFilters: ColumnFiltersState) => {
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex space-x-4">
      <ComboboxFilter
        label="Filtrar por Semestre"
        placeholder="Buscar semestre..."
        filterId="semestre"
        items={semestres?.map((semestre) => `${semestre}`) || []}
        filters={filters}
        onFilterChange={handleFiltersChange}
      />
    </div>
  );
};
