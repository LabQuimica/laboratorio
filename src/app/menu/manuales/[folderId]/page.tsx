"use client";
import { useParams } from "next/navigation";
import ManualPage from "@/components/layouts/manuales/manual";

const FolderPage = () => {
  const params = useParams();
  const folderId = params.folderId as string;

  return (
    <div className="container mx-auto">
      <ManualPage folderId={folderId} />
    </div>
  );
};

export default FolderPage;
