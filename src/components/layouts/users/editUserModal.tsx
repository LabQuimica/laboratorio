"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useUpdateUser } from "@/hooks/Users/useUserMutations";
import { User } from "@/types/user";

interface EditUserModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

type EditUserFormValues = {
  name: string;
  email: string;
  codigo: string;
  rol: "administrador" | "profesor" | "alumno";
};

const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose }) => {
  const { register, handleSubmit, reset } = useForm<EditUserFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      codigo: user.codigo,
      rol: user.rol,
    },
  });
  const { mutateAsync } = useUpdateUser();

  const onSubmit = async (data: EditUserFormValues) => {
    try {
      await mutateAsync({ id_user: user.id_user, ...data });
      toast({ title: "Éxito", description: "Usuario modificado correctamente", open: true });
      reset();
      onClose();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, open: true });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modificar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre:</label>
            <input {...register("name", { required: true })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Correo:</label>
            <input type="email" {...register("email", { required: true })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Código (Boleta):</label>
            <input {...register("codigo", { required: true })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Rol:</label>
            <select {...register("rol", { required: true })} className="w-full p-2 border rounded">
              <option value="administrador">Administrador</option>
              <option value="profesor">Profesor</option>
              <option value="alumno">Alumno</option>
            </select>
          </div>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Guardar Cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
