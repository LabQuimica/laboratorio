"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import profile from "/public/images/profile.jpeg";
import { SidebarLink } from "@/components/ui/sidebar";
import { ThemeMenu } from "./ui/ThemeMenu";
import { UserMenu } from "./ui/UserMenu";

export const ProfileLink = ({
  setAnimate,
}: {
  setAnimate: (value: boolean) => void;
}) => {
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
        <ThemeMenu />
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
