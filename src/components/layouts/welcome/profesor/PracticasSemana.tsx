"use client";
import React, { useEffect, useState } from 'react';
import { IconSpeakerphone, IconCalendarEvent, IconChevronRight, IconLoader } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from "@/components/ui/button";

interface Practica {
  id_unique_practica: number;
  nombre: string;
  grupo: string;
  semestre: string;
  status: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface PracticasSemanaProps {
  profesorId: number;
}

const PracticasSemana: React.FC<PracticasSemanaProps> = ({ profesorId }) => {
  const [practicas, setPracticas] = useState<Practica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPracticas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/docentes/getPracticasAsignadasDocente/${profesorId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar las prácticas');
        }
        
        const data = await response.json();
        
        // Filtrar prácticas pendientes o en progreso de la semana actual
        const hoy = new Date();
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay()); // Domingo de esta semana
        
        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6); // Sábado de esta semana
        
        const practicasFiltradas = data.filter((practica: Practica) => {
          // Verificar si está pendiente o en progreso
          if (practica.status !== 'pendiente' && practica.status !== 'progreso') {
            return false;
          }
          
          // Parsear fecha de la práctica
          const fechaPractica = new Date(practica.fecha_inicio.split(' ')[0].split('/').reverse().join('-'));
          
          // Verificar si está en la semana actual o ya pasó pero sigue en progreso
          return (
            (fechaPractica >= inicioSemana && fechaPractica <= finSemana) || 
            (practica.status === 'progreso' && fechaPractica < hoy)
          );
        });
        
        setPracticas(practicasFiltradas);
      } catch (err) {
        console.error("Error cargando prácticas:", err);
        setError("No se pudieron cargar las prácticas");
      } finally {
        setLoading(false);
      }
    };

    if (profesorId) {
      fetchPracticas();
    }
  }, [profesorId]);

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
        <IconLoader className="animate-spin text-blue-500" size={24} />
        <span className="ml-2">Cargando prácticas...</span>
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

  if (practicas.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md">
        <p className="text-blue-600 dark:text-blue-400">
          No tienes prácticas pendientes o en progreso para esta semana.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <IconSpeakerphone className="mr-2 text-blue-500" size={20} />
        Prácticas de esta semana
      </h3>
      
      <div className="space-y-3">
        {practicas.map((practica) => (
          <div 
            key={practica.id_unique_practica}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{practica.nombre}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {practica.grupo} • {practica.semestre}
                </p>
                <div className="flex items-center mt-1">
                  <IconCalendarEvent size={16} className="text-gray-500 dark:text-gray-400 mr-1" /> 
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(practica.fecha_inicio)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  practica.status === 'pendiente' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                }`}>
                  {practica.status === 'pendiente' ? 'Pendiente' : 'En progreso'}
                </span>
                <IconChevronRight size={18} className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = "/menu/practica"}>
        Ver todas mis prácticas
      </Button>
    </div>
  );
};

export default PracticasSemana;