'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { usePracticas } from "@/hooks/Practicas/usePractica";

function AddPractica() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { createPractica } = usePracticas();

    const handleCreatePractica = async () => {
        setIsSubmitting(true);
        try {
            await createPractica({
                nombre,
                descripcion,
                creadorId: 5,
            });
            alert("Práctica creada exitosamente");
            setNombre(""); // Limpia los campos después de guardar
            setDescripcion("");
        } catch (error) {
            console.error("Error al crear la práctica", error);
        } finally {
            setIsSubmitting(false); // Habilita el botón nuevamente
        }
    };    

    return (
        <div className="z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-bg-active-light text-black hover:bg-bg-disable-light dark:bg-bg-active-dark dark:text-white dark:hover:bg-bg-disable-dark text-sm font-semibold py-5 px-4 rounded-xl ml-10">
                        Añadir +
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] p-14 rounded-3xl">
                    <DialogHeader>
                    <DialogTitle>Crear nueva práctica</DialogTitle>
                    <DialogDescription>Ingrese los detalles de la práctica.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nombre" className="text-right">
                        Nombre
                      </Label>
                      <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="descripcion" className="text-right">
                        Descripción
                      </Label>
                      <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreatePractica} disabled=    {isSubmitting} className="bg-bg-active-light text-black hover:bg-secondary-blue-light dark:hover:bg-secondary-blue-dark dark:text-white">
                      {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
    );
}

export default AddPractica;