export const fetchDriveFiles = async () => {
    try {
      const response = await fetch("http://localhost:1234/api/drive-files"); // Ahora llama a tu backend
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error al obtener archivos desde el backend:", error);
      return [];
    }
  };
  