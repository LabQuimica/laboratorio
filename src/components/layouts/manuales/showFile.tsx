"use client";
import { useState } from "react";
import {
  IconFileTypePdf,
  IconFolder,
  IconFile,
  IconCheck,
} from "@tabler/icons-react";
import { Manual } from "../../../types/archivoTypes";

interface ManualFileProps {
  file: Manual;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: () => void;
}

const ManualFile = ({
  file,
  isSelectionMode = false,
  isSelected = false,
}: ManualFileProps) => {
  const [_, setHover] = useState(false);

  // iconos de los archivos (solo dpf y carpetas)
  const FileIcon = () => {
    if (file.mimeType === "application/pdf") {
      return <IconFileTypePdf className="w-12 h-12 text-red-600" />;
    } else if (file.mimeType === "application/vnd.google-apps.folder") {
      return <IconFolder className="w-12 h-12 text-blue-600" />;
    } else {
      return <IconFile className="w-12 h-12 text-green-600" />;
    }
  };

  const FileContent = () => (
    <div
      className="flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (
          !isSelectionMode &&
          file.mimeType === "application/vnd.google-apps.folder"
        ) {
          window.open(`/menu/manuales/${file.id}`, "_blank");
        }
      }}
      style={{
        cursor:
          file.mimeType === "application/vnd.google-apps.folder"
            ? "pointer"
            : "default",
      }}
    >
      <div className="relative">
        <FileIcon />
        {isSelectionMode && (
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full p-1 flex items-center justify-center ${
              isSelected ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            {isSelected && <IconCheck className="w-4 h-4 text-white" />}
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-center">{file.name}</p>
    </div>
  );

  return (
    // para mostrar el archivo en el lector de pdf de drive
    <a
      href={
        file.mimeType === "application/pdf"
          ? `https://drive.google.com/file/d/${file.id}/view`
          : file.webViewLink
      }
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
    >
      <FileContent />
    </a>
  );
};

export default ManualFile;
