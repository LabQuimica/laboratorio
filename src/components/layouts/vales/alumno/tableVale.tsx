"use client";
import { useAlumnoVales } from "@/hooks/Vales/useAlumnoVales";
import { Table } from "@/components/table/Table";
import { EstadoValeFilter } from "@/components/layouts/vales/FilterVale";
import { EstadoVale, Vale } from "@/types/ValeTypes";
import {
  columsPendiente,
  columsProgreso,
  columsCompletada,
  columsCancelada,
} from "./columnsVale";

export const ValesAlumnoTable = ({ viewType }: { viewType: EstadoVale }) => {
  const { data, isLoading, isError } = useAlumnoVales(viewType);

  // Selección dinámica de columnas según el estado
  const columns =
    viewType === "pendiente"
      ? columsPendiente
      : viewType === "progreso"
      ? columsProgreso
      : viewType === "completada"
      ? columsCompletada
      : columsCancelada;

  return (
    <Table<Vale>
      data={data || []}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      orderBy="id_vale"
      reactQueryKEY="vales"
      FilterComponent={EstadoValeFilter}
    />
  );
};
