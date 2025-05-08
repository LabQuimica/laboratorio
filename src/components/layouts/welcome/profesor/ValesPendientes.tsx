"use client";
import React, { useEffect, useState } from 'react';
import { IconFileCheck, IconLoader, IconClipboardList, IconAlertCircle } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";

interface Vale {
  id_pa: number;
  nombre_profesor: string;
  nombre_materia: string;
  semestre: string;
  fecha_asignada: string;
  fecha_entrega: string;
  nombre_practica: string;
  status_practica: string;
}

interface ValesPendientesProps {
  limit?: number;
}

const ValesPendientes: React.FC<ValesPendientesProps> = ({ limit = 3 }) => {
  const [vales, setVales] = useState<Vale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVales = async () => {
      try {
        setLoading(true);
        // Obtener vales pendientes
        const response = await fetch(`/api/vale/getProfesorValeStatus?estado=pendiente`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los vales');
        }
        
        const data = await response.json();
        
        // Limitar a la cantidad especificada
        setVales(data.slice(0, limit));
      } catch (err) {
        console.error("Error cargando vales:", err);
        setError("No se pudieron cargar los vales pendientes");
      } finally {
        setLoading(false);
      }
    };

    fetchVales();
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <IconLoader className="animate-spin text-purple-500" size={24} />
        <span className="ml-2">Cargando vales...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (vales.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <IconFileCheck className="mr-2 text-purple-500" size={20} />
          Vales pendientes
        </h3>
        
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <IconClipboardList className="text-gray-400 dark:text-gray-500 mb-2" size={36} />
          <p className="text-gray-600 dark:text-gray-400">
            No tienes vales pendientes por revisar.
          </p>
        </div>
        
        <Button className="w-full mt-2" variant="outline" onClick={() => window.location.href = "/menu/vale"}>
          Gestionar vales
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <IconFileCheck className="mr-2 text-purple-500" size={20} />
        Vales pendientes
      </h3>
      
      {vales.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-md p-3 mb-4 flex items-start">
          <IconAlertCircle className="text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" size={18} />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Tienes {vales.length} {vales.length === 1 ? 'vale pendiente' : 'vales pendientes'} por revisar
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {vales.map((vale) => (
          <div 
            key={vale.id_pa}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{vale.nombre_practica}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {vale.nombre_materia} • {vale.semestre}
            </p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Entrega: {vale.fecha_entrega}</span>
              <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
                Pendiente
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = "/menu/vale"}>
        Ver todos los vales
      </Button>
    </div>
  );
};

export default ValesPendientes;