import { Row } from "@tanstack/react-table";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import ObservacionesValeProfesor from "./ProfesorObservaciones.vale.alumno";
import ObservacionesValeAdministrador from "./AdministradorObservaciones.vale.alumno";

interface ProjectActionsProps<TData> {
  row: Row<TData>;
}

function ObservacionesVale<TData>({ row }: ProjectActionsProps<TData>) {
  const { user } = useContext(UserContext);

  if (user?.rol === "profesor") {
    return <ObservacionesValeProfesor row={row} />;
  }

  if (user?.rol === "administrador") {
    return <ObservacionesValeAdministrador row={row} />;
  }

  return null;
}

export default ObservacionesVale;
