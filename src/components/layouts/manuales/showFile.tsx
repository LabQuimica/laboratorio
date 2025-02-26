"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Usa shadcn/ui
import { FileText } from "lucide-react"; // Icono de PDF

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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div
              className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
              onClick={() => setOpen(true)}
            >
              <FileText className="w-12 h-12 text-red-600" />
              <p className="text-sm font-medium text-center">{file.name}</p>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <iframe
              src={`https://drive.google.com/file/d/${file.id}/preview`}
              className="w-full h-[500px] border-none"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <a
          href={file.webViewLink}
          // target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex flex-col items-center gap-2 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden border w-full max-w-3xl"
        >
          {file.name}
        </a>
      )}
    </div>
  );
};

export default ManualFile;
