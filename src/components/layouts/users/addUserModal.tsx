"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddUser } from "@/hooks/Users/useUserMutations";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast"; // Tu toast personalizado
import * as XLSX from "xlsx";
import { useUsers } from "@/hooks/Users/useUser";

export type User = {
  id: string;
  name: string;
  email: string;
  codigo: string;
  // other properties
};

type AddUserFormValues = {
  name: string;
  email: string;
  password: string;
  codigo: string;
  rol: "administrador" | "profesor" | "alumno";
};

const AddUserModal = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"manual" | "excel">("manual");
  const [excelData, setExcelData] = useState<AddUserFormValues[]>([]);
  const { register, handleSubmit, reset } = useForm<AddUserFormValues>({
    defaultValues: { rol: "alumno" },
  });
  const { mutateAsync } = useAddUser();
  const { data: users } = useUsers(); // Lista actual de usuarios

  // Función para verificar duplicados
  const isDuplicate = (newUser: AddUserFormValues): boolean => {
    if (!users) return false;
    return users.some(
      (u) => u.email === newUser.email || u.codigo === newUser.codigo
    );
  };

  // Modo manual: enviar un usuario individual
  const onSubmitManual = async (data: AddUserFormValues) => {
    if (isDuplicate(data)) {
      toast({
        title: "Error",
        description: "Ya existe un usuario con este correo o código",
        open: true,
      });
      return;
    }
    try {
      await mutateAsync(data);
      toast({
        title: "Éxito",
        description: "Usuario agregado correctamente",
        open: true,
      });
      reset();
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        open: true,
      });
    }
  };

  // Modo Excel: procesar archivo y guardar datos en estado
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Se espera que el archivo tenga columnas: name, email, password, codigo, rol (rol puede venir vacío)
      const jsonData: AddUserFormValues[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setExcelData(jsonData);
      toast({
        title: "Archivo cargado",
        description: "Revise y confirme el registro de usuarios",
        open: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error procesando el archivo: " + error.message,
        open: true,
      });
    }
  };

  // Confirmar registro masivo: filtrar duplicados y registrar solo los nuevos
  const onConfirmExcel = async () => {
    if (!excelData.length) {
      toast({
        title: "Error",
        description: "No hay datos en el archivo",
        open: true,
      });
      return;
    }
    // Filtrar usuarios duplicados comparando con la lista actual
    const newUsers = excelData.filter((userData) => !isDuplicate(userData));
    if (newUsers.length === 0) {
      toast({
        title: "Error",
        description: "Todos los registros ya existen",
        open: true,
      });
      return;
    }
    try {
      // Registrar secuencialmente (o usar Promise.all para paralelizar)
      await Promise.all(
        newUsers.map((userData) =>
          mutateAsync({ ...userData, rol: userData.rol || "alumno" })
        )
      );
      toast({
        title: "Éxito",
        description: "Usuarios agregados correctamente",
        open: true,
      });
      setExcelData([]);
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        open: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Usuario</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mb-4">
          <Button
            variant={mode === "manual" ? "default" : "outline"}
            onClick={() => setMode("manual")}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Manual
          </Button>
          <Button
            variant={mode === "excel" ? "default" : "outline"}
            onClick={() => setMode("excel")}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Excel
          </Button>
        </div>
        {mode === "manual" ? (
          <form onSubmit={handleSubmit(onSubmitManual)} className="space-y-4">
            <div>
              <label className="block mb-1">Nombre:</label>
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block mb-1">Correo:</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Correo"
              />
            </div>
            <div>
              <label className="block mb-1">Contraseña:</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Contraseña"
              />
            </div>
            <div>
              <label className="block mb-1">Código (Boleta):</label>
              <input
                {...register("codigo", { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Código"
              />
            </div>
            <div>
              <label className="block mb-1">Rol:</label>
              <select
                {...register("rol", { required: true })}
                defaultValue="alumno"
                className="w-full p-2 border rounded"
              >
                <option value="administrador">Administrador</option>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
              </select>
            </div>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Agregar Usuario
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <label className="block mb-1">Subir archivo Excel (.xlsx):</label>
            <input type="file" accept=".xlsx" onChange={onFileChange} />
            {excelData.length > 0 && (
              <Button onClick={onConfirmExcel} className="bg-blue-600 text-white hover:bg-blue-700">
                Confirmar Registro de Usuarios
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
