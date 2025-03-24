import { useDeletePractica } from '@/hooks/Practicas/usePractica';
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
import { useToast } from "@/hooks/use-toast";
import { useContext } from 'react';
import { UserContext } from "@/context/UserContext";

interface DeletePracticaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idPractica: number;
}

const DeletePractica = ({ open, onOpenChange, idPractica }: DeletePracticaProps) => {
  const deletePractica = useDeletePractica();
  const { toast } = useToast();
  const { user } = useContext(UserContext);

  const handleDeleteConfirm = async () => {
    try {
      await deletePractica.mutateAsync({ idPractica, profesorId: user?.id_user });
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
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de eliminar la práctica?</AlertDialogTitle>
          <AlertDialogDescription>
            No es posible deshacer esta acción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black dark:text-white'>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="text-white" onClick={handleDeleteConfirm}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePractica;