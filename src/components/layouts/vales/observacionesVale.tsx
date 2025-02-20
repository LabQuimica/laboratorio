import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Row } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStatusStore } from "@/stores/valesStore";
import { CommentChange } from "@/types/ValeTypes";

interface ProjectActionsProps<TData> {
  row: Row<TData>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

function ObservacionesVale<TData>({
  row,
  tableType,
}: ProjectActionsProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const commentChanges = useStatusStore((state) => state.commentChanges);
  const addCommentChange = useStatusStore((state) => state.addCommentChange);

  const idVale = Number(row.getValue("id_vale"));
  const existingChange = commentChanges.find(
    (change) => change.id_vale === idVale
  );
  const originalComment =
    String(row.getValue("observaciones_vale")) || "Ningún comentario";

  const [editedComment, setEditedComment] = useState<string>(
    existingChange ? existingChange.newObservation : originalComment
  );

  const currentComment = existingChange
    ? existingChange.newObservation
    : originalComment;

  const handleSave = () => {
    // Si el comentario está vacío, usar "Ningún comentario"
    const finalComment =
      editedComment.trim() === "" ? "Ningún comentario" : editedComment;

    setEditedComment(finalComment);

    const change: CommentChange = {
      id_vale: idVale,
      oldObservation: originalComment,
      newObservation: finalComment,
      tableType,
    };

    addCommentChange(change);
    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onDoubleClick={() => setIsDialogOpen(true)}>
          <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
            {currentComment}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[800px] break-words">
          <p>{currentComment}</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Observación</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <Input
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              placeholder="Escribe tu observación aquí..."
              className="rounded-xl border-white"
            />
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setEditedComment(currentComment);
                setIsDialogOpen(false);
              }}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Guardar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
export default ObservacionesVale;
