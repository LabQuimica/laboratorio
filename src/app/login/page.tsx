"use client";
import { useState, useContext, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { login } from "@/services/authService";
import HexagonPattern from "@/components/ui/hexagons";
import { User } from "@/types/userTypes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser, setLoading } = useContext(UserContext);
  const router = useRouter();

  // Llamar al theme provider para cambiar el logo dependiendo del modo oscuro o claro
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await login(email, password);
      setLoading(false);
      setUser(data.user as User);
      Cookies.set("token", data.token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess("Inicio de sesión exitoso");
      setTimeout(() => {
        router.push("/menu");
      }, 100);
    } catch (err: any) {
      setError(err.message);
    }
  };

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
    <div>
      <HexagonPattern color="#FFFFFF" className="w-1/3 right-0 left-2/3" />

      <div className="w-full h-dvh flex pl-10 align-middle justify-center items-center bg-light-bg dark:bg-dark-bg dark:text-white">
        <div className="flex flex-col absolute w-2/3 top-0 left-0 px-44 h-full justify-center">
          <div className="align-middle justify-center">
            <h1 className="uppercase font-bold text-4xl text-center">
              ¡BienvenidO de nuevo!
            </h1>
            <p className="font-semibold text-2xl text-center mt-4">
              Estamos Felices Por Tenerte Aquí
            </p>
          </div>
          <div className="flex pt-16 w-full justify-center align-middle items-center">
            <form
              onSubmit={handleSubmit}
              className="w-3/4 align-middle justify-center"
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <div className="w-full inline-grid">
                <label className="text-sm">Usuario:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-4 px-5 py-3 bg-bg-active-light dark:bg-bg-active-dark font-semibold rounded-full shadow-w-full pl-4 text-sm placeholder:text-gray-600 dark:placeholder:text-gray-400 text-black dark:text-white"
                />
              </div>
              <div className="w-full inline-grid mt-8">
                <label className="text-sm">Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-4 px-5 py-3 bg-bg-active-light dark:bg-bg-active-dark font-semibold rounded-full shadow-w-full pl-4 text-sm placeholder:text-gray-600 dark:placeholder:text-gray-400 text-black dark:text-white"
                />
              </div>
              <div className="w-full flex align-middle items-center justify-center">
                <button
                  type="submit"
                  className="mt-12 w-1/3 px-5 py-3 bg-bg-active-light dark:bg-bg-active-dark text-black dark:text-white font-semibold rounded-full shadow-lg shadow-gray-300 dark:shadow-gray-950 hover:bg-gray-200 dark:hover:bg-gray-800 text-xl"
                >
                  <p className="text-center font-bold text-base text-black dark:text-white">
                    Iniciar Sesión
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="absolute flex h-full w-1/3 items-center align-middle justify-center left-2/4">
          <div className="absolute bg-bg-disable-light dark:bg-bg-disable-dark p-10 rounded-full h-[20rem] w-[20rem] shadow-lg">
            <Image
              src={logoSrc}
              alt="logo"
              className="w-full h-auto"
              width={500}
              height={500}
              priority={true}
            />
          </div>
        </div>

        <div className="absolute w-1/3 bg-btn-session-blue opacity-30 shadow-inner h-full right-0 top-0 bottom-0 m-0 p-0 -z-10"></div>
      </div>
    </div>
  );
}
