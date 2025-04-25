"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchManualFile } from "../../../services/fetchManuales";
import ManualFile from "./showFile";
import { Manual } from "../../../types/archivoTypes";

interface ManualFileListProps {
  isSelectionMode: boolean;
  selectedFiles: string[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  folderId?: string;
}

const ManualFileList = ({ isSelectionMode, selectedFiles, setSelectedFiles, folderId }: ManualFileListProps) => {
  const { data: files, isLoading, isError, refetch } = useQuery<Manual[], Error>({
    queryKey: ["manualFiles", folderId],
    queryFn: () => fetchManualFile(folderId),
  });

  if (isLoading) {
    return <p>Cargando archivos...</p>;
  }

  if (isError) {
    return <p>Hubo un error al cargar los archivos.</p>;
  }

  if (!files || files.length === 0) {
    return <p>No hay archivos disponibles.</p>;
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <ManualFile 
          key={file.id} 
          file={file} 
          isSelectionMode={isSelectionMode}
          isSelected={selectedFiles.includes(file.id)}
          onToggleSelection={() => toggleFileSelection(file.id)}
        />
      ))}
    </div>
  );
};

export default ManualFileList;