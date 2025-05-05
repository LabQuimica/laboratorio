// src/components/layouts/users/AddUserModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, Controller } from "react-hook-form";
import { useAddUser } from "@/hooks/Users/useUserMutations";
import { useUsers } from "@/hooks/Users/useUser";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import type { AddUserRequest } from "@/types/user";

type FormValues = AddUserRequest;

export default function AddUserModal() {
  /* ------------------ estado / react‑hook‑form ------------------ */
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"manual" | "excel">("manual");
  const [excelData, setExcelData] = useState<FormValues[]>([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { rol: "alumno" } });

  /* ------------------ queries / mutations ------------------ */
  const addUser = useAddUser();
  const { data: users } = useUsers();

  const isDup = (u: FormValues) =>
    users?.some(x => x.email === u.email || x.codigo === u.codigo);

  /* ------------------ alta manual ------------------ */
  const onManual = async (data: FormValues) => {
    if (isDup(data)) {
      toast({ title: "Error", description: "Usuario duplicado", open: true });
      return;
    }
    try {
      await addUser.mutateAsync(data);
      toast({ title: "Éxito", description: "Usuario agregado", open: true });
      reset({
        name:     "",
        email:    "",
        password: "",
        codigo:   "",
        rol:      "alumno",
      });
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive", open: true });
    }
  };

  /* ------------------ lectura de Excel ------------------ */
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const wb = XLSX.read(await file.arrayBuffer());
    const raw: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });

    // Normalizamos nombre de columnas  y rellenamos rol vacío → alumno
    const parsed: FormValues[] = raw.map(r => ({
      name:     r.name     || r.Nombre        || "",
      email:    r.email    || r.Correo        || "",
      password: r.password || r.Contraseña    || "",
      codigo:   r.codigo   || r["N.Boleta"]   || "",
      rol: (r.rol || "").toLowerCase() as any || "alumno",
    }));

    // validamos que TODOS los campos obligatorios existan
    const invalid = parsed.filter(
      u => !u.name || !u.email || !u.password || !u.codigo
    );
    if (invalid.length) {
      toast({
        title: "Error",
        description: `Faltan campos en ${invalid.length} fila(s). Verifica el archivo.`,
        variant: "destructive",
        open: true,
      });
      return;
    }

    setExcelData(parsed);
    toast({ title: "Archivo", description: "Datos listos para registrar", open: true });
  };

  /* ------------------ alta masiva ------------------ */
  const onConfirm = async () => {
    const nuevos = excelData.filter(u => !isDup(u));
    if (!nuevos.length) {
      toast({ title: "Error", description: "Todos los registros son duplicados", open: true });
      return;
    }
    try {
      await Promise.all(nuevos.map(u => addUser.mutateAsync(u)));
      toast({ title: "Éxito", description: "Usuarios agregados", open: true });
      setExcelData([]);
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive", open: true });
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Agregar usuario</Button></DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>Agregar usuario</DialogTitle></DialogHeader>

        <Tabs value={mode} onValueChange={v => setMode(v as any)}>
          <TabsList>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="excel">Excel</TabsTrigger>
          </TabsList>
        </Tabs>

        {mode === "manual" ? (
          <form onSubmit={handleSubmit(onManual)} className="space-y-4 mt-4" noValidate>
            <Input {...register("name",     { required: "El nombre es obligatorio" })} placeholder="Nombre" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

            <Input {...register("email", {
                required: "El correo es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Formato de correo inválido" }
              })} placeholder="Email" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

            <Input {...register("password", { required: "La contraseña es obligatoria" })} type="password" placeholder="Contraseña" />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

            <Input {...register("codigo",   { required: "La boleta es obligatoria" })} placeholder="Código (Boleta)" />
            {errors.codigo && <p className="text-red-600 text-sm">{errors.codigo.message}</p>}

            <Controller
              name="rol"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Rol" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="alumno">Alumno</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Button type="submit">Agregar</Button>
          </form>
        ) : (
          <div className="space-y-4 mt-4">
            <input type="file" accept=".xlsx" onChange={onFile} />
            {excelData.length > 0 && (
              <Button onClick={onConfirm}>
                Registrar {excelData.length} usuario{excelData.length > 1 && "s"}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
