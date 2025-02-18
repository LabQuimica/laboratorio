"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserContext } from "@/context/UserContext";

export const UserMenu = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
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
