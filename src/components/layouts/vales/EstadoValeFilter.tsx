"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnFiltersState } from "@tanstack/react-table";

interface EstadoValeFilterProps {
  onFilterChange: (filters: ColumnFiltersState) => void;
}

export const EstadoValeFilter = ({ onFilterChange }: EstadoValeFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filtrar </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onFilterChange([])}>
          Todos
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onFilterChange([{ id: "estado_vale", value: "pendiente" }])
          }
        >
          Pendiente
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onFilterChange([{ id: "estado_vale", value: "progreso" }])
          }
        >
          En progreso
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onFilterChange([{ id: "estado_vale", value: "completada" }])
          }
        >
          Completada
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onFilterChange([{ id: "estado_vale", value: "cancelada" }])
          }
        >
          Cancelada
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
