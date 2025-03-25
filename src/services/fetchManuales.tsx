const URL = process.env.NEXT_PUBLIC_API_URL || 'localhost:1234';

// obtener archivos
export const fetchManualFile = async (folderId?: string) => {
  try {
    const response = await fetch(`http://${URL}/manuales/drive-files${folderId ? `?folderId=${folderId}` : ''}`);
    if (!response.ok) {
      throw new Error('Error al obtener los archivos');
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// subir archivos
export const uploadFile = async (formData: FormData) => {
  try {
    const response = await fetch(`http://${URL}/manuales/upload-to-drive`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Error al subir el archivo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// eliminar archivos
export const deleteFiles = async (fileIds: string[]) => {
  try {
    const response = await fetch(`http://${URL}/manuales/delete-files`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileIds }),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar los archivos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};