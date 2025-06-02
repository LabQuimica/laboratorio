"use client";
import ManualFileList from "./list";
import { useState } from "react";

interface ManualPageProps {
  folderId?: string;
}

const ManualPage = ({ folderId }: ManualPageProps) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

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
