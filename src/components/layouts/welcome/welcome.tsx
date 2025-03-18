"use client";

import { Shortcuts } from "./shortcuts";
import ItemsAlertList from "./itemsAlertList";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";



const WelcomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="pt-10 text-3xl font-bold mb-4 font-sans text-neutral-700 dark:text-neutral-200">
        QuimiLab - Hola {user?.name}
      </h1>


      {/* Contenedor principal con Shortcuts a la izquierda y Cards a la derecha */}
      <div className="pt-6 flex flex-col md:flex-row gap-6">
        {/* Shortcuts - Menú lateral */}
        {/* <div className="w-full md:max-w-sm">
          <Shortcuts />
        </div> */}

        {/* Cards de alerta */}
        <div className="flex-1">
          <ItemsAlertList />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
