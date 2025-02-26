export const fetchManualFile = async () => {
    try {
      const response = await fetch("http://localhost:1234/api/drive-files"); 
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error al obtener archivos desde el servidor:", error);
      return [];
    }
  };
  