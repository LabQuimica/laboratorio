import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Logo = () => {
  // Llamar al theme provider para cambiar el logo dependiendo del modo oscuro o claro
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Para el logo
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoSrc =
    theme === "dark" || resolvedTheme === "dark"
      ? "/assets/logo_dark_wt.svg"
      : "/assets/logo_light_wt.svg";

  return (
    <div className="flex items-center w-full align-middle pl-3">
      <Link
        href="/menu/dashboard"
        className="flex space-x-5 items-center text-sm text-black py-1 relative z-20 self-center"
      >
        <Image src={logoSrc} alt="logo" width={30} height={30} />
        <div className="text-xl  text-black dark:text-white">QuimiLab</div>
      </Link>
    </div>
  );
};
