// "use client";

// import { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { UserContext } from "@/context/UserContext";

// interface Props {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<Props> = ({ children }) => {
//   const { user, loading } = useContext(UserContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && (!user || user.rol === "alumno")) {
//       router.push("/login");
//     }
//   }, [user, loading, router]);

//   if (loading) return <div>Cargando...</div>;

//   if (!user || user.rol === "alumno") return null;

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// laboratorio/src/components/hoc/ProtectedRoute.tsx
"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (loading) return; // aún verificando
    // Caso no loggeado
    if (!user && !notified) {
      toast({
        title: "Debes iniciar sesión",
        description: "Por favor inicia sesión para acceder.",
        open: true,
      });
      setNotified(true);
      router.push("/login");
    }
    // Caso rol alumno
    else if (user?.rol === "alumno" && !notified) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para esta sección.",
        open: true,
      });
      setNotified(true);
      router.push("/login");
    }
  }, [user, loading, router, notified]);

  // Mientras cargue o esté bloqueado, no renderices nada
  if (loading || !user || user.rol === "alumno") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
