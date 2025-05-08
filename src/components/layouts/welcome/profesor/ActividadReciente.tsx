"use client";
import React, { useEffect, useState } from 'react';
import { IconActivity, IconCheck, IconClock, IconLoader } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Actividad {
  id: number;
  tipo: 'practica' | 'vale';
  accion: string;
  titulo: string;
  grupo?: string;
  fecha: string;
  estatus?: string;
}

interface ActividadRecienteProps {
  profesorId: number;
  limit?: number;
}

const ActividadReciente: React.FC<ActividadRecienteProps> = ({ profesorId, limit = 5 }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        setLoading(true);
        
        // Obtener prácticas asignadas del profesor
        const practicasRes = await fetch(`/api/docentes/getPracticasAsignadasDocente/${profesorId}`);
        const practicasData = await practicasRes.json();
        
        // Obtener vales pendientes y en progreso
        const valesPendientesRes = await fetch(`/api/vale/getProfesorValeStatus?estado=pendiente`);
        const valesPendientesData = await valesPendientesRes.json();
        
        const valesProgresoRes = await fetch(`/api/vale/getProfesorValeStatus?estado=progreso`);
        const valesProgresoData = await valesProgresoRes.json();
        
        // Transformar prácticas en actividades
        const actividadesPracticas = practicasData.map((p: any) => ({
          id: p.id_unique_practica,
          tipo: 'practica' as const,
          accion: 'Práctica asignada',
          titulo: p.nombre,
          grupo: `${p.grupo} - ${p.semestre}`,
          fecha: p.fecha_creacion,
          estatus: p.status
        }));
        
        // Transformar vales en actividades
        const actividadesVales = [...valesPendientesData, ...valesProgresoData].map((v: any) => ({
          id: v.id_pa,
          tipo: 'vale' as const,
          accion: v.status_practica === 'pendiente' ? 'Vale pendiente' : 'Vale en progreso',
          titulo: v.nombre_practica,
          grupo: `${v.nombre_materia} - ${v.semestre}`,
          fecha: v.fecha_asignada,
          estatus: v.status_practica
        }));
        
        // Combinar y ordenar por fecha (más reciente primero)
        const todasActividades = [...actividadesPracticas, ...actividadesVales].sort((a, b) => {
          // Convertir fechas (formato: "DD/MM/YYYY HH:mm")
          const fechaA = new Date(a.fecha.split(' ')[0].split('/').reverse().join('-') + 'T' + a.fecha.split(' ')[1]);
          const fechaB = new Date(b.fecha.split(' ')[0].split('/').reverse().join('-') + 'T' + b.fecha.split(' ')[1]);
          return fechaB.getTime() - fechaA.getTime();
        });
        
        // Limitar a la cantidad especificada
        setActividades(todasActividades.slice(0, limit));
      } catch (err) {
        console.error("Error cargando actividades:", err);
        setActividades([]);
      } finally {
        setLoading(false);
      }
    };

    if (profesorId) {
      fetchActividades();
    }
  }, [profesorId, limit]);

  const formatTimeAgo = (dateString: string) => {
    try {
      // El formato recibido es "DD/MM/YYYY HH:mm"
      const parts = dateString.split(' ');
      const dateParts = parts[0].split('/');
      const timeParts = parts[1].split(':');
      
      const date = new Date(
        parseInt(dateParts[2]), // año
        parseInt(dateParts[1]) - 1, // mes (0-11)
        parseInt(dateParts[0]), // día
        parseInt(timeParts[0]), // hora
        parseInt(timeParts[1])  // minutos
      );
      
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (e) {
      console.error("Error parsing date:", e);
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <IconLoader className="animate-spin text-green-500" size={24} />
        <span className="ml-2">Cargando actividad...</span>
      </div>
    );
  }

  if (actividades.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <IconActivity className="mr-2 text-green-500" size={20} />
          Actividad reciente
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-center py-4">
          No hay actividad reciente para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <IconActivity className="mr-2 text-green-500" size={20} />
        Actividad reciente
      </h3>
      
      <div className="space-y-4">
        {actividades.map((actividad) => (
          <div 
            key={`${actividad.tipo}-${actividad.id}`}
            className="flex items-start"
          >
            <div className={`rounded-full p-2 mr-3 ${
              actividad.tipo === 'practica' 
                ? 'bg-blue-100 dark:bg-blue-900/40' 
                : 'bg-purple-100 dark:bg-purple-900/40'
            }`}>
              {actividad.tipo === 'practica' ? (
                <IconCheck size={16} className="text-blue-600 dark:text-blue-400" />
              ) : (
                <IconClock size={16} className="text-purple-600 dark:text-purple-400" />
              )}
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {actividad.accion}
              </p>
              <h4 className="text-gray-800 dark:text-gray-200 font-medium mt-1">
                {actividad.titulo}
              </h4>
              {actividad.grupo && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {actividad.grupo}
                </p>
              )}
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(actividad.fecha)}
                </span>
                
                {actividad.estatus && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    actividad.estatus === 'pendiente' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  }`}>
                    {actividad.estatus === 'pendiente' ? 'Pendiente' : 'En progreso'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActividadReciente;