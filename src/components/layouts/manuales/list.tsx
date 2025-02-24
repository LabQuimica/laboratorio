"use client";
import { useState, useEffect } from "react";
import { fetchDriveFiles } from "./fetchManuales";
import DriveFile from "./showFile";

const DriveFileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriveFiles().then((files) => {
      setFiles(files);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Archivos en Google Drive</h2>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos disponibles.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <DriveFile key={file.id} file={file} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DriveFileList;
