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
    if (!loading && (!user || user.rol === "alumno")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Cargando...</div>;

  if (!user || user.rol === "alumno") return null;

  return <>{children}</>;
};

export default ProtectedRoute;
