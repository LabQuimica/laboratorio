import { IconUser, IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "../../ui/dropdown-menu";

export const UserMenu = () => {
  return (
    <>
      <DropdownMenuItem>
        <IconUser />
        Perfil
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer text-red-500">
        <IconLogout />
        Cerrar sesión
      </DropdownMenuItem>
    </>
  );
};
