"use client";
import { useProfesorVales } from "@/hooks/Vales/useVales";
import { Table } from "@/components/table/Table";
import { EstadoValeProfesor, ValeProfesor } from "@/types/ValeTypes";
import { columsProfesorVale } from "./columns";
import { FilterProfesorVale } from "./FilterValeProfesor";

export const ValesProfesorTable = ({
  viewType,
}: {
  viewType: EstadoValeProfesor;
}) => {
  const { data, isLoading, isError } = useProfesorVales(viewType);

  return (
    <Table<ValeProfesor>
      data={data || []}
      columns={columsProfesorVale}
      isLoading={isLoading}
      isError={isError}
      orderBy="nombre_profesor"
      reactQueryKEY={["valesProfesor", "valeProfesorDetails"]}
      FilterComponent={FilterProfesorVale}
    />
  );
};
