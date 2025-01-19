"use client";
import { useTheme } from "next-themes";
import React from "react";
import {
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconLogout,
  IconUser,
  IconHeartCheck,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import profile from "../../../public/images/profile.jpeg";
import { SidebarLink } from "@/components/ui/sidebar";

export const ProfileLink = ({
  setAnimate,
}: {
  setAnimate: (value: boolean) => void;
}) => {
  const { setTheme, theme } = useTheme();

  const handleOpenChange = (open: boolean) => {
    setAnimate(!open); // Desactivar animación cuando el menú está abierto
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarLink
          link={{
            label: "Manu Arora",
            href: "#",
            icon: (
              <Image
                src={profile}
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
            ),
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={5}
        className="w-[12.5rem] bg-background"
      >
        <DropdownMenuLabel>Temas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="cursor-pointer">
          <IconSettings />
          Configuraciones
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <IconMoon />
          Modo oscuro
          {theme === "dark" && (
            <DropdownMenuShortcut>
              <IconHeartCheck />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <IconSun />
          Modo claro
          {theme === "light" && (
            <DropdownMenuShortcut>
              <IconHeartCheck />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          <IconDeviceDesktop />
          Sistema
          {theme === "system" && (
            <DropdownMenuShortcut>
              <IconHeartCheck />
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconUser />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500">
          <IconLogout />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
