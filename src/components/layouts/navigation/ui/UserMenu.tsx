// import { IconUser, IconLogout } from "@tabler/icons-react";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// export const UserMenu = () => {
//   return (
//     <>
//       <DropdownMenuItem>
//         <IconUser />
//         Perfil
//       </DropdownMenuItem>
//       <DropdownMenuItem className="cursor-pointer text-red-500">
//         <IconLogout />
//         Cerrar sesión
//       </DropdownMenuItem>
//     </>
//   );
// };


"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserContext } from "@/context/UserContext"; // Asegúrate de que la ruta sea la correcta

export const UserMenu = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Remueve la cookie del token
    Cookies.remove("token");
    // Actualiza el estado global del usuario (puedes establecerlo en null o en el valor que corresponda)
    setUser(null);
    // Redirige al login
    router.push("/login");
  };

  return (
    <>
      <DropdownMenuItem>
        <IconUser />
        Perfil
      </DropdownMenuItem>
      <DropdownMenuItem 
        className="cursor-pointer text-red-500"
        onClick={handleLogout}
      >
        <IconLogout />
        Cerrar sesión
      </DropdownMenuItem>
    </>
  );
};
