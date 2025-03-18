"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { IconReload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface TableControlsProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  filteredRowCount: number;
  totalRowCount: number;
  filterComponent?: React.ReactNode;
  reactQueryKEY: string[];
}

export const TableControls = ({
  globalFilter,
  setGlobalFilter,
  filteredRowCount,
  totalRowCount,
  filterComponent,
  reactQueryKEY,
}: TableControlsProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleInvalidate = async (reactQueryKEYs: string[]) => {
    try {
      await queryClient.invalidateQueries({ queryKey: reactQueryKEYs });

      // Espera a que las queries se revaliden y verifica si hay errores
      const queries = queryClient
        .getQueryCache()
        .findAll({ queryKey: reactQueryKEYs });

      for (const query of queries) {
        if (query.state.error) {
          throw query.state.error; // Lanza el error si existe
        }
      }

      toast({
        title: "Actualización exitosa",
        description: "Se ha actualizado la información.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo actualizar la información. ${
          (error as any)?.message || ""
        }`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {/* Barra de búsqueda */}
        <Input
          placeholder="Buscar..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm border-gray-300 rounded-2xl"
        />

        {/* Componente de filtros personalizado */}
        {filterComponent}
      </div>
      <div className="flex items-center gap-8">
        {/* Información de filas mostradas */}
        <div className="text-sm text-gray-700 dark:text-white">
          Mostrando {filteredRowCount} de {totalRowCount} filas
        </div>
        <div>
          <Button
            className="border-slate-300"
            variant="outline"
            onClick={() => {
              handleInvalidate(reactQueryKEY);
            }}
          >
            <IconReload />
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
};
