import { Badge } from "@/components/ui/badge";

import { EstadoVale } from "@/types/ValeTypes";
import { Row } from "@tanstack/react-table";
import statusStyles from "../../statusStyles";

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
