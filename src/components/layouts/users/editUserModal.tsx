// src/components/layouts/users/EditUserModal.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useUpdateUser } from "@/hooks/Users/useUserMutations";
import { User } from "@/types/userTypes";

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
}

type FormValues = Pick<User, "name" | "email" | "codigo" | "rol">;

export default function EditUserModal({ user, open, onClose }: Props) {
  const { control, register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      codigo: user.codigo,
      rol: user.rol,
    },
  });
  const updateUser = useUpdateUser();

  // Reset form values when the modal is closed
  useEffect(() => {
    if (!open) {
      reset({
        name: user.name,
        email: user.email,
        codigo: user.codigo,
        rol: user.rol,
      });
    }
  }, [open, reset, user]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUser.mutateAsync({ id_user: user.id_user, ...data });
      toast({ title: "Éxito", description: "Usuario modificado", open: true });
      onClose();
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modificar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name", { required: true })} placeholder="Nombre" />
          <Input
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            placeholder="Email"
          />
          <Input {...register("codigo", { required: true })} placeholder="Código" />

          <Controller
            name="rol"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="profesor">Profesor</SelectItem>
                  <SelectItem value="alumno">Alumno</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button type="submit">Guardar Cambios</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
