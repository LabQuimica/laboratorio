"use client";

import { Material } from "@/types/MaterialesTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeleteMaterial } from "@/hooks/Materials/useMaterialMutations";
import { toast } from "@/hooks/use-toast";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

interface MaterialActionsProps {
  material: Material;
  onEdit: (m: Material) => void;
}

export default function MaterialActions({
  material,
  onEdit,
}: MaterialActionsProps) {
  const deleteMat = useDeleteMaterial();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMat.mutateAsync(material.id_item);
      toast({
        title: "Eliminado",
        description: "Material eliminado con éxito",
        open: true,
      });
      setOpenDialog(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
        open: true,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            Acciones
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(material)}>
            <IconEdit className="mr-2 h-4 w-4 text-blue-500" />
            Modificar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <IconTrash className="mr-2 h-4 w-4 text-red-500" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar este material?</DialogTitle>
          </DialogHeader>
          <div>
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este material?
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
