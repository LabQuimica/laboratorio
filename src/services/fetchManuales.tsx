const URL = process.env.NEXT_PUBLIC_API_URL;


export const fetchManualFile = async () => {
    try {
      const response = await fetch(`http://${URL}/manuales/drive-files`); 
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error al obtener archivos desde el servidor:", error);
      return [];
    }
  };
  