"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarLink } from "@/components/ui/sidebar";
import { ThemeMenu } from "./ui/ThemeMenu";
import { UserMenu } from "./ui/UserMenu";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from "@/components/ui/avatar";

export const ProfileOptions = ({
  setAnimate,
}: {
  setAnimate: (value: boolean) => void;
}) => {
  const { user } = useContext(UserContext);
  const handleOpenChange = (open: boolean) => {
    setAnimate(!open);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarLink
          link={{
            label: user?.name || "",
            href: "#",
            icon: (
              <Avatar>
                <AvatarImage src={`/avatars/${user?.img}`} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
            ),
          }}
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={5}
        className="w-[12.5rem] bg-background"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DropdownMenuSeparator />
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
