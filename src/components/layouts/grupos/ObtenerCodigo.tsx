"use client";

import { useState } from "react";
import { useAddGrupoCode, useGrupoCode } from '@/hooks/Groups/useGroups';
import { createHash } from 'crypto';
import { IconScan } from '@tabler/icons-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, } from "@/components/ui/input-otp";

interface ObtenerCodigoProps {
  idGrupo: number;
}

// Funcion para generar codigo
function generarCodigoUnico(idGrupo: number): string {
  const hash = createHash('sha256').update(idGrupo.toString()).digest('hex');
  return `${hash.substring(0, 6).toUpperCase()}`;
}

const ObtenerCodigo = ({ idGrupo }: ObtenerCodigoProps) => {
  const { data, isLoading, isError } = useGrupoCode(idGrupo);
  const { mutate: agregarCodigo, isPending} = useAddGrupoCode();
  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el código.</div>;

  const codigo = data?.codigo ?? generarCodigoUnico(idGrupo);

  // Si el codigo no existe en la BD lo guarda despues de generarlo
  const handleGuardarCodigo = () => {
    if (!data?.codigo) {
      agregarCodigo({ grupoId: idGrupo, codigo });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleGuardarCodigo} disabled={isPending}>
          {isPending ? "Guardando..." : "Ver Código"}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center p-10 align-middle justify-center">
        <DialogHeader className="items-center">
          <div className="flex dark:bg-slate-700 p-3 rounded-full items-center justify-center align-middle">
            <IconScan stroke={2} className="w-10 h-10 self-center"/>
          </div>
          <DialogTitle className="text-center">
            <p className="text-xl">Código de Grupo</p>
            <p className="font-thin text-sm">Comparta este codigo con los estudiantes</p>
          </DialogTitle>
        </DialogHeader>
        <InputOTP maxLength={6} value={codigo} disabled>
            <InputOTPGroup className="space-x-3">
                {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center">
                    <InputOTPSlot index={index} className="h-20 w-14 text-xl"/>
                    {index === 2 && <InputOTPSeparator className="ml-3"/>}
                </div>
                ))}
            </InputOTPGroup>
        </InputOTP>
      </DialogContent>
    </Dialog>
  );
};

export default ObtenerCodigo;