import { useState } from "react";
import { usePracticas } from '@/hooks/Practicas/usePractica';
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

  const { deletePractica } = usePracticas();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta práctica?")) {
      try {
        await deletePractica({ idPractica, profesorId: 5 });
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
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className='h-7 hover:bg-gray-100 dark:hover:bg-gray-700'>Opciones</Button>
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
