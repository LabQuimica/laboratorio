"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Shortcuts } from "../shortcuts";
import PracticasSemana from "../profesor/PracticasSemana";
import ValesPendientes from "../profesor/ValesPendientes";
import ActividadReciente from "../profesor/ActividadReciente";
import EstadisticasProfesor from "../profesor/EstadisticasProfesor";
import { IconSpeakerphone, IconBook, IconArrowRight } from '@tabler/icons-react';

const ProfesorDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
            <IconSpeakerphone className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Bienvenido, Profesor</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Panel de control del laboratorio de química
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Gestiona tus prácticas asignadas, supervisa vales de materiales y lleva el control de tus actividades académicas en el laboratorio.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="/menu/practica"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ir a prácticas
            <IconArrowRight size={16} className="ml-1" />
          </a>
          
          <a 
            href="/menu/vale"
            className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Ir a vales
            <IconArrowRight size={16} className="ml-1" />
          </a>
          
          <a 
            href="/menu/manuales"
            className="flex items-center text-sm text-green-600 dark:text-green-400 hover:underline"
          >
            Ver manuales
            <IconArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
      
      {/* Estadísticas */}
      <EstadisticasProfesor profesorId={user?.id_user} />
      
      {/* Contenido principal en 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Prácticas de la semana */}
          <PracticasSemana profesorId={user?.id_user} />
          
          {/* Actividad reciente */}
          <ActividadReciente profesorId={user?.id_user} limit={5} />
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Vales pendientes */}
          <ValesPendientes limit={4} />
          
          {/* Acceso rápido a recursos */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <IconBook className="mr-2 text-teal-500" size={20} />
              Recursos académicos
            </h3>
            
            <div className="space-y-3">
              <a 
                href="/menu/manuales"
                className="block p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Manuales de laboratorio</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Accede a todos los manuales y guías para tus prácticas
                </p>
              </a>
              
              <a 
                href="/menu/materiales"
                className="block p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Inventario de materiales</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consulta la disponibilidad de materiales y reactivos
                </p>
              </a>
              
              <a 
                href="/menu/grupos"
                className="block p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Gestión de grupos</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Administra los grupos asignados a tus prácticas
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesorDashboard;