// laboratorio/src/components/ProtectedRoute.tsx
"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Solo redirigimos si ya terminó de cargar y no hay usuario o es "alumno"
    if (!loading && (!user || user.rol === "alumno")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Mientras se carga el estado, opcionalmente muestra un spinner
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario o tiene rol "alumno", también podríamos retornar null (ya se redirigirá)
  if (!user || user.rol === "alumno") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
