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

import { useToast } from "@/hooks/use-toast";
import { useCreatePractica } from "@/hooks/Practicas/usePractica2";

function AddPractica() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createPractica = useCreatePractica();

    const { toast } = useToast();

    const handleCreatePractica = async () => {
        setIsSubmitting(true);
        try {
            await createPractica.mutateAsync({
                nombre,
                descripcion,
                num_equipos: 5,
                creadorId: 5,
            });
            toast({
                title: "Operación exitosa",
                description: "Práctica creada exitosamente",
            });

            setNombre("");
            setDescripcion("");
        } catch (error) {
            console.error("Error al crear la práctica", error);
            toast({
                title: "Error",
                description: "No se pudo crear la práctica.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };    

    return (
        <div className="z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex flex-row rounded-sm text-white dark:text-black items-center justify-center align-middle">
                        <span className="text-xl">+</span>
                        <p className="h-full">Nueva Práctica</p>
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
                        <Button onClick={handleCreatePractica} disabled={isSubmitting} className="bg-bg-active-light text-white hover:bg-secondary-blue-light dark:hover:bg-secondary-blue-dark dark:text-black">
                            {isSubmitting ? "Guardando..." : "Guardar"} 
                        </Button>
                    </DialogFooter>
                    
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddPractica;