import { useState } from "react";
import { useDeletePractica} from '@/hooks/Practicas/usePractica2';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface PracticaActionsProps {
  idPractica: number;
}

const PracticaActions = ({ idPractica}: PracticaActionsProps) => {

  const deletePractica = useDeletePractica();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      await deletePractica.mutateAsync({ idPractica, profesorId: 5 });
      toast({
        title: "Operación exitosa",
        description: "Práctica eliminada correctamente",
      });
    } catch (error) {
      console.error("Error eliminando la práctica:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la práctica.",
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='p-2 rounded-sm bg-gray-200 dark:bg-bg-disable-dark hover:bg-gray-300 dark:hover:bg-gray-700'>Opciones</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => console.log("Modificar práctica")}>
            <IconEdit className="h-5 w-5 mr-2" /> Modificar
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setOpen(true)} className="text-red-600">
            <IconTrash className="h-5 w-5 mr-2" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      {/* Para comfirmar practica eliminada */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar la práctica?</AlertDialogTitle>
            <AlertDialogDescription>
              No es posible deshacer esta acción.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="text-white dark:text-black" onClick={handleDeleteConfirm}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PracticaActions;
