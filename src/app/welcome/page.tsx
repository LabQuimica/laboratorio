"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import HexagonPattern from "@/components/ui/hexagons";

export default function WelcomePage() {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const logoSrc =
    theme === "dark" || resolvedTheme === "dark"
      ? "/assets/logo_dark.svg"
      : "/assets/logo_light.svg";

  return (
    <div className="flex h-full w-full flex-row overflow-hidden">
      {/* Hexagonos del fondo */}
      <HexagonPattern color="#3988FF" className="w-2/3" />

      {/* Logo */}
      <div className="absolute flex h-full w-1/3 items-center align-middle justify-center left-2/4">
        <div className="absolute bg-bg-disable-light dark:bg-bg-disable-dark p-10 rounded-full h-[20rem] w-[20rem] shadow-lg">
          <Image
            src={logoSrc}
            alt="logo"
            className="w-auto h-auto"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Texto de bienvenida y btn de inicio de sesion */}
      <div className="absolute pl-56 flex flex-col h-full align-middle justify-center left-0">
        <h1 className="text-7xl font-bold">Bienvenido a</h1>
        <p className="text-7xl font-bold mt-3">QuimiLab</p>
        <p className="mt-5 text-xl">Por favor, inicie sesión para continuar.</p>
        <button
          onClick={handleLoginRedirect}
          className="mt-12 w-1/2 px-5 py-3 bg-bg-active-light dark:bg-bg-active-dark text-black dark:text-white font-semibold rounded-full shadow-lg shadow-gray-300 dark:shadow-gray-950 hover:bg-gray-200 dark:hover:bg-gray-800 text-xl"
        >
          Iniciar Sesión
        </button>
      </div>

      <div className="absolute w-1/3 bg-btn-session-blue opacity-30 shadow-inner h-full right-0 top-0 bottom-0 m-0 p-0 -z-10"></div>
    </div>
  );
}
