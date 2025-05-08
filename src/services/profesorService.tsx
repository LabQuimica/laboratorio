// services/profesorService.ts

// Función para obtener las prácticas asignadas a un profesor
export const fetchPracticasProfesor = async (profesorId: number) => {
    try {
      const response = await fetch(`/api/docentes/getPracticasAsignadasDocente/${profesorId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar las prácticas del profesor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en fetchPracticasProfesor:', error);
      throw error;
    }
  };
  
  // Función para obtener las prácticas creadas por un profesor
  export const fetchPracticasCreadasProfesor = async (profesorId: number) => {
    try {
      const response = await fetch(`/api/docentes/getPracticasCreadasDocente/${profesorId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar las prácticas creadas por el profesor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en fetchPracticasCreadasProfesor:', error);
      throw error;
    }
  };
  
  // Función para obtener las prácticas inhabilitadas de un profesor
  export const fetchPracticasInhabilitadasProfesor = async (profesorId: number) => {
    try {
      const response = await fetch(`/api/docentes/getPracticasInhabilitadasDocente/${profesorId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar las prácticas inhabilitadas del profesor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en fetchPracticasInhabilitadasProfesor:', error);
      throw error;
    }
  };
  
  // Función para obtener vales por estado
  export const fetchValesPorEstado = async (estado: 'pendiente' | 'progreso' | 'completada' | 'cancelada') => {
    try {
      const response = await fetch(`/api/vale/getProfesorValeStatus?estado=${estado}`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar los vales en estado ${estado}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en fetchValesPorEstado:', error);
      throw error;
    }
  };
  
  // Función para obtener detalles de un vale
  export const fetchDetallesVale = async (idPracticaAsignada: number) => {
    try {
      const response = await fetch(`/api/vale/getValeProfesorDetails?id_practica_asignada=${idPracticaAsignada}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los detalles del vale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en fetchDetallesVale:', error);
      throw error;
    }
  };
  
  // Función para actualizar el estado de un vale
  export const actualizarEstadoVale = async (idVale: number, nuevoEstado: string, observacion?: string) => {
    try {
      const payload = {
        id_vale: idVale,
        newStatus: nuevoEstado,
        newObservation: observacion
      };
      
      const response = await fetch('/api/vale/updateVales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([payload]), // Se envía como array ya que la API espera un array
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del vale');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en actualizarEstadoVale:', error);
      throw error;
    }
  };
  
  // Función para actualizar el estado de múltiples vales
  export const actualizarMultiplesVales = async (cambios: Array<{id_vale: number, newStatus?: string, newObservation?: string}>) => {
    try {
      const response = await fetch('/api/vale/updateVales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambios),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar múltiples vales');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en actualizarMultiplesVales:', error);
      throw error;
    }
  };
  
  // Función para obtener estadísticas del profesor
  export const obtenerEstadisticasProfesor = async (profesorId: number) => {
    try {
      // Obtener datos de diferentes endpoints
      const [practicasAsignadas, valesPendientes, valesProgreso] = await Promise.all([
        fetchPracticasProfesor(profesorId),
        fetchValesPorEstado('pendiente'),
        fetchValesPorEstado('progreso')
      ]);
      
      // Calcular estadísticas
      const practicasPendientes = practicasAsignadas.filter((p: any) => p.status === 'pendiente').length;
      const practicasProgreso = practicasAsignadas.filter((p: any) => p.status === 'progreso').length;
      
      return {
        practicasTotal: practicasAsignadas.length,
        practicasPendientes,
        practicasProgreso,
        valesPendientes: valesPendientes.length,
        valesProgreso: valesProgreso.length
      };
    } catch (error) {
      console.error('Error en obtenerEstadisticasProfesor:', error);
      throw error;
    }
  };