"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { login } from "@/stores/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await login(email, password);
      setUser(data.user);
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

  return (
    <div className="w-full h-dvh flex pl-10 align-middle justify-center items-center bg-light-bg dark:bg-dark-bg dark:text-white">
      <div className="w-1/2">
        <div className="align-middle justify-center">
          <h1 className="uppercase font-bold text-4xl text-center">
            ¡BienvenidO de nuevo!
          </h1>
          <p className="font-semibold text-2xl text-center">
            Estamos felices por tenerte aquí
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
              <label className="text-sm">Correo:</label>
              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#CCD4DE] rounded-3xl h-10 w-full pl-4 mt-2 placeholder:text-gray-600"
              />
            </div>
            <div className="w-full inline-grid mt-5">
              <label className="text-sm">Contraseña:</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#CCD4DE] rounded-3xl h-10 w-full pl-4 mt-2 placeholder:text-gray-600"
              />
            </div>
            <div className="w-full flex align-middle items-center justify-center">
              <button
                type="submit"
                className="bg-[#3E53A0] mt-10 rounded-3xl w-1/2 self-center h-10"
              >
                <p className="text-center font-semibold text-lg">
                  Iniciar Sesión
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center align-middle">
        <Image
          src="/assets/logo.png"
          alt="logo"
          className="h-96 w-96"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
