import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { EstadoVale } from "@/types/ValeTypes";
import { Row } from "@tanstack/react-table";
import StatusAlumnoProfesor from "./ProfesorStatus.vale.alumno";
import StatusAlumnoAdministrador from "./AdministradorStatus.vale.alumno";

interface Vale {
  id_vale: number;
  estado_vale: EstadoVale;
}

interface StatusValeProps {
  row: Row<Vale>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

const StatusValeAlumno = ({ row, tableType }: StatusValeProps) => {
  const { user } = useContext(UserContext);

  if (user?.rol === "profesor") {
    return <StatusAlumnoProfesor row={row} tableType={tableType} />;
  }

  if (user?.rol === "administrador") {
    return <StatusAlumnoAdministrador row={row} tableType={tableType} />;
  }

  return null;
};

export default StatusValeAlumno;
