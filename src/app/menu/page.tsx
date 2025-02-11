"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

function Menu() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-light-bg dark:bg-dark-bg dark:text-white">
      <img
        src="/assets/logo.png"
        alt="logo"
        style={{ width: "400px", height: "400px" }}
      />
      <h1 style={{ fontSize: "38px", marginTop: "30px" }} className="text-center font-bold">
        Hola {user?.name}!
      </h1>
    </div>
  );
}

export default welcome;