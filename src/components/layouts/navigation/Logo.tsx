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
      ? "/assets/logo_dark.svg"
      : "/assets/logo_light.svg";

  return (
    <div className="flex items-center w-full align-middle justify-center">
      <Link
        href="/menu/dashboard"
        className="flex font-normal space-x-2 items-center text-sm text-black py-1 relative z-20 self-center"
      >
        <Image
          src={logoSrc}
          alt="logo"
          className="w-auto h-auto"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};
