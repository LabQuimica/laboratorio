import ComboboxFilter from "@/components/table/ComboboxFilter";
import { useGrupos } from "@/hooks/Groups/useGroups";
import { useDocentes } from "@/hooks/Practicas/usePractica";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface PracticaAdminFilterProps {
  viewType: "creadas" | "asignadas" | "archivadas";
  onFilterChange: (filters: ColumnFiltersState) => void;
}

export const PracticaAdminFilter = ({ viewType, onFilterChange }: PracticaAdminFilterProps) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const { data: docentes} = useDocentes();
  const { data: grupos} = useGrupos();

  const handleFiltersChange = (updatedFilters: ColumnFiltersState) => {
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex space-x-4">
      <ComboboxFilter
        label="Filtrar por Docente"
        placeholder="Buscar docente..."
        filterId="docente"
        items={docentes?.map((docente) => docente.name) || []}
        filters={filters}
        onFilterChange={handleFiltersChange}
      />

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
