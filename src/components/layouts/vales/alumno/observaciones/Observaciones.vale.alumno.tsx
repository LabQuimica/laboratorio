import { Row } from "@tanstack/react-table";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import ObservacionesValeProfesor from "./ProfesorObservaciones.vale.alumno";
import ObservacionesValeAdministrador from "./AdministradorObservaciones.vale.alumno";

interface ProjectActionsProps<TData> {
  row: Row<TData>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

function ObservacionesVale<TData>({
  row,
  tableType,
}: ProjectActionsProps<TData>) {
  const { user } = useContext(UserContext);

  if (user?.rol === "profesor") {
    return <ObservacionesValeProfesor tableType={tableType} row={row} />;
  }

  if (user?.rol === "administrador") {
    return <ObservacionesValeAdministrador row={row} tableType={tableType} />;
  }

  return null;
}

export default ObservacionesVale;
