"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchManualFile } from "../../../services/fetchManuales";
import ManualFile from "./showFile";
import { Manual } from "../../../types/archivoTypes";

const ManualFileList = () => {
  const { data: files, isLoading, isError } = useQuery<Manual[], Error>({
    queryKey: ["manualFiles"],
    queryFn: fetchManualFile,
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <ManualFile key={file.id} file={file} />
      ))}
    </div>
  );
};

export default ManualFileList;