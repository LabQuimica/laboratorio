const URL = process.env.NEXT_PUBLIC_API_URL;

// obtener archivos
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

// subir archivos
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch(`http://${URL}/manuales/upload-to-drive`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al subir el archivo");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
};

// eliminar archivos
export const deleteFiles = async (fileIds: string[]) => {
  try {
    const response = await fetch(`http://${URL}/manuales/delete-from-drive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileIds }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al eliminar los archivos");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar archivos:", error);
    throw error;
  }
};