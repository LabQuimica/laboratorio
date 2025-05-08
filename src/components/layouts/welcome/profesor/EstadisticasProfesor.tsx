"use client";
import React, { useEffect, useState } from 'react';
import { IconSpeakerphone, IconFileCheck, IconChartBar, IconLoader } from '@tabler/icons-react';

interface EstadisticasProps {
  profesorId: number;
}

const EstadisticasProfesor: React.FC<EstadisticasProps> = ({ profesorId }) => {
  const [stats, setStats] = useState({
    practicasTotal: 0,
    practicasPendientes: 0,
    practicasProgreso: 0,
    valesPendientes: 0,
    valesProgreso: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        
        // Obtener prácticas del profesor
        const practicasRes = await fetch(`/api/docentes/getPracticasAsignadasDocente/${profesorId}`);
        const practicasData = await practicasRes.json();
        
        // Obtener vales pendientes y en progreso
        const valesPendientesRes = await fetch(`/api/vale/getProfesorValeStatus?estado=pendiente`);
        const valesPendientesData = await valesPendientesRes.json();
        
        const valesProgresoRes = await fetch(`/api/vale/getProfesorValeStatus?estado=progreso`);
        const valesProgresoData = await valesProgresoRes.json();
        
        // Calcular estadísticas
        const practicasPendientes = practicasData.filter((p: any) => p.status === 'pendiente').length;
        const practicasProgreso = practicasData.filter((p: any) => p.status === 'progreso').length;
        
        setStats({
          practicasTotal: practicasData.length,
          practicasPendientes,
          practicasProgreso,
          valesPendientes: valesPendientesData.length,
          valesProgreso: valesProgresoData.length
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    if (profesorId) {
      fetchEstadisticas();
    }
  }, [profesorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <IconLoader className="animate-spin text-blue-500" size={24} />
        <span className="ml-2">Cargando estadísticas...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <IconChartBar className="mr-2 text-indigo-500" size={20} />
        Resumen de actividad
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Prácticas</p>
              <h4 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">{stats.practicasTotal}</h4>
            </div>
            <IconSpeakerphone className="text-blue-500" size={28} />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/80 dark:bg-blue-950/40 rounded p-2">
              <span className="text-blue-700 dark:text-blue-300">Pendientes</span>
              <p className="text-blue-800 dark:text-blue-200 font-bold text-lg">{stats.practicasPendientes}</p>
            </div>
            <div className="bg-white/80 dark:bg-blue-950/40 rounded p-2">
              <span className="text-blue-700 dark:text-blue-300">En progreso</span>
              <p className="text-blue-800 dark:text-blue-200 font-bold text-lg">{stats.practicasProgreso}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Vales</p>
              <h4 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mt-1">
                {stats.valesPendientes + stats.valesProgreso}
              </h4>
            </div>
            <IconFileCheck className="text-purple-500" size={28} />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/80 dark:bg-purple-950/40 rounded p-2">
              <span className="text-purple-700 dark:text-purple-300">Pendientes</span>
              <p className="text-purple-800 dark:text-purple-200 font-bold text-lg">{stats.valesPendientes}</p>
            </div>
            <div className="bg-white/80 dark:bg-purple-950/40 rounded p-2">
              <span className="text-purple-700 dark:text-purple-300">En progreso</span>
              <p className="text-purple-800 dark:text-purple-200 font-bold text-lg">{stats.valesProgreso}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasProfesor;