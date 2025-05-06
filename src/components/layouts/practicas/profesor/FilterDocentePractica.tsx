import ComboboxFilter from "@/components/table/ComboboxFilter";
import { useGrupos } from "@/hooks/Groups/useGroups";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface PracticaProfFilterProps {
  viewType: "creadas" | "asignadas" | "archivadas";
  onFilterChange: (filters: ColumnFiltersState) => void;
}

export const PracticaProfFilter = ({ viewType, onFilterChange }: PracticaProfFilterProps) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const { data: grupos} = useGrupos();

  const handleFiltersChange = (updatedFilters: ColumnFiltersState) => {
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex space-x-4">
      {(viewType === "asignadas" || viewType === "archivadas") && (
        <ComboboxFilter
          label="Filtrar por Grupo"
          placeholder="Buscar grupo..."
          filterId="grupoCompleto"
          items={grupos?.map((grupo) => `${grupo.nombre} ${grupo.semestre}`) || []}
          filters={filters}
          onFilterChange={handleFiltersChange}
        />
      )}
    </div>
  );
};
