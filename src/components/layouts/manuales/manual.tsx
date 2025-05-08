"use client"
import ManualFileList from "./list";
import UploadButton from "./uploadButton";
import { useState } from "react";
import { deleteFiles } from "../../../services/fetchManuales";
import { useQueryClient } from "@tanstack/react-query";

interface ManualPageProps {
  folderId?: string;
}

const ManualPage = ({ folderId }: ManualPageProps) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const queryClient = useQueryClient();

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsDeleting(true);
    setDeleteError("");
    
    try {
      await deleteFiles(selectedFiles);
      
      // Actualizar la lista de archivos
      queryClient.invalidateQueries({ queryKey: ["manualFiles"] });
      
      // Resetear selección
      setSelectedFiles([]);
      setIsSelectionMode(false);
    } catch (error) {
      console.error("Error al eliminar archivos:", error);
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-sans">Manuales disponibles</h1>
  
      </div>
    
      
      <ManualFileList 
        isSelectionMode={isSelectionMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        folderId={folderId}
      />
    </div>
  );
};

export default ManualPage;