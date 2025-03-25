"use client";
import { useState, useRef } from "react";
import { IconUpload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../../../services/fetchManuales";

interface UploadButtonProps {
  folderId?: string;
}

const UploadButton = ({ folderId }: UploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("files", file);
      if (folderId) {
        formData.append("folderId", folderId);
      }

      await uploadFile(formData);
      
      // barra de carga
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 100);
      };
      
      simulateProgress();

      // actualiza los archivos que recibe del drive
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["manualFiles"] });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setIsUploading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error al subir:", error);
      setUploadError(error instanceof Error ? error.message : "Error desconocido");
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
      >
        {isUploading ? (
          <span>Subiendo...</span>
        ) : (
          <>
            <IconUpload className="w-5 h-5 mr-2" />
            <span>Subir archivo</span>
          </>
        )}
      </button>
      
      {uploadError && (
        <div className="absolute top-full right-0 mt-2 bg-red-100 text-red-700 p-2 rounded-md text-sm">
          {uploadError}
        </div>
      )}
      
      {isUploading && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-100 rounded-md overflow-hidden">
          <div 
            className="bg-blue-600 h-1" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;