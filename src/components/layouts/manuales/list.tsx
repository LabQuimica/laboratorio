"use client";
import { useState, useEffect } from "react";
import { fetchManualFile } from "./fetchManuales";
import ManualFile from "./showFile"; 

const ManualFileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManualFile().then((files) => {
      setFiles(files);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <ManualFile key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualFileList;
