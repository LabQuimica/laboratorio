import { Badge } from "@/components/ui/badge";

import { EstadoVale } from "@/types/ValeTypes";
import { Row } from "@tanstack/react-table";

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950 ",
  cancelada: "bg-rose-300 text-red-950 ",
  incompleto: "bg-stone-300 text-stone-950 ",
} as const;

interface Vale {
  id_vale: number;
  estado_vale: EstadoVale;
}

interface StatusValeProps {
  row: Row<Vale>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

const StatusAlumnoProfesor = ({ row }: StatusValeProps) => {
  const currentStatus: EstadoVale = row.getValue("estado_vale");

  return (
    <div className="flex items-center justify-center">
      <Badge
        className={`${statusStyles[currentStatus]} px-2 py-1 rounded-full w-28 text-center justify-center`}
      >
        {currentStatus}
      </Badge>
    </div>
  );
};

export default StatusAlumnoProfesor;
