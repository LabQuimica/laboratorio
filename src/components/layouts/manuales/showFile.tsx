"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import {
  IconFileTypePdf,
  IconFolder,
  IconFile
} from "@tabler/icons-react";

type ManualFileProps = {
  file: {
    id: string;
    name: string;
    mimeType: string;
    webViewLink: string;
  };
};

const ManualFile = ({ file }: ManualFileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      {file.mimeType === "application/pdf" ? (
        <a
        href={`https://drive.google.com/file/d/${file.id}/view`} // URL de visualización de Drive
        target="_blank" // Abre en una nueva pestaña
        rel="noopener noreferrer"
        className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
      >
        <IconFileTypePdf className="w-12 h-12 text-red-600" />
        <p className="text-sm font-medium text-center">{file.name}</p>
      </a>
        // <Dialog open={open} onOpenChange={setOpen}>
        //   <DialogTrigger asChild>
        //     <div
        //       className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
        //       onClick={() => setOpen(true)}
        //     >
        //       <IconFileTypePdf className="w-12 h-12 text-red-600" /> {/* Ícono de archivos PDF */}
        //       <p className="text-sm font-medium text-center">{file.name}</p>
        //     </div>
        //   </DialogTrigger>
        //   <DialogContent className="max-w-4xl">
        //   <DialogTitle className="sr-only">Vista previa del PDF</DialogTitle> {/* Título accesible */}

        //     <iframe
        //       src={`https://drive.google.com/file/d/${file.id}/preview`}
        //       className="w-full h-[500px] border-none"
        //     />
        //   </DialogContent>
        // </Dialog>
      ) : file.mimeType === "application/vnd.google-apps.folder" ? ( // Si es una carpeta
        <a
        href={file.webViewLink} // Usa la URL de la carpeta
        target="_blank"         // Abre en una nueva pestaña
        rel="noopener noreferrer"
        className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
      >
        <IconFolder className="w-12 h-12 text-blue-600" /> {/* Ícono de carpeta */}
        <p className="text-sm font-medium text-center">{file.name}</p>
      </a>

      ) : (
        <a
          href={file.webViewLink}
          // target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
        >
           <IconFile className="w-12 h-12 text-green-600" /> {/* Ícono de archios generales */}
           <p className="text-sm font-medium text-center">{file.name}</p>
        </a>
      )}
    </div>
  );
};

export default ManualFile;
