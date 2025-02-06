"use client";
import { useTheme } from "next-themes";
import {
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconHeartCheck,
} from "@tabler/icons-react";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export const ThemeMenu = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
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
    </>
  );
};
