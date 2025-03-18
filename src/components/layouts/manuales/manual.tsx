"use client"
import ManualFileList from "./list";
import UploadButton from "./uploadButton";
import { useState } from "react";
import { deleteFiles } from "../../../services/fetchManuales";
import { useQueryClient } from "@tanstack/react-query";

const ManualPage = () => {
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
        <div className="flex gap-2">
          {isSelectionMode ? (
            <>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedFiles.length === 0 || isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-400"
              >
                {isDeleting ? "Eliminando..." : `Eliminar (${selectedFiles.length})`}
              </button>
              <button
                onClick={() => {
                  setIsSelectionMode(false);
                  setSelectedFiles([]);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <UploadButton />
              <button
                onClick={() => setIsSelectionMode(true)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Eliminar archivos
              </button>
            </>
          )}
        </div>
      </div>
      
      {deleteError && (
        <div className="mb-4 bg-red-100 text-red-700 p-2 rounded-md">
          {deleteError}
        </div>
      )}
      
      <ManualFileList 
        isSelectionMode={isSelectionMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
};

export default ManualPage;