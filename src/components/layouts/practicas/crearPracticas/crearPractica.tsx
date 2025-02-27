'use client';
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Materiales from "./materiales";
import MaterialesReview from "./materialesReview";
import { usePracticaStore } from "@/stores/practicasStore";

export default function CrearPracticaPage() {
    const { nombre, setNombre, descripcion, setDescripcion, numEquipos, setNumEquipos } = usePracticaStore();


    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2 font-sans">Nueva Práctica</h1>

        <div className="flex flex-row">
            {/* Data */}
            <div className="w-2/3">
                {/* Nombre de la practica */}
                <div>
                    <Label htmlFor="nombre" className="text-right text-lg">
                        Nombre
                    </Label>
                    <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}className="rounded-lg mt-3 h-10 w-5/6 shadow-none" placeholder="Escriba un nombre de práctica"/>
                </div>

                {/* Descripcion de la practica */}
                <div className="mt-5">
                    <Label htmlFor="descripcion" className="text-right text-lg">
                        Descripción
                    </Label>
                    <Textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="rounded-lg mt-3 h-40 w-5/6" placeholder="Escriba una descripción de práctica"/>
                </div>

                {/* Numero de equipos */}
                <div>
                    <Label htmlFor="equipos" className="text-right text-lg">
                        Número de equipos
                    </Label>
                    <Input id="equipos" value={numEquipos} onChange={(e) => setNumEquipos(Number(e.target.value))} className="rounded-lg mt-3 h-10 w-20 text-center shadow-none" placeholder="1"/>
                </div>

                {/* File upleader */}
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                    <Label htmlFor="file" className="text-lg">Archivo de Práctica</Label>
                    <Input id="file" type="file" className="h-fit p-3 cursor-pointer shadow-none items-center align-middle justify-center"/>
                </div>

                {/* Materiales */}
                <div className="mt-5">
                    <p className="text-lg font-semibold">
                        Materiales
                    </p>
                    <Materiales/>
                </div>
            </div>

            {/* Review */}
            <div className="bg-bg-active-light dark:bg-primary w-1/3 mx-10 p-6 rounded-xl h-full">
                <p className="text-xl font-semibold">
                    Materiales agregados
                </p>
                {/* Materiales agregados por secciones */}
                <MaterialesReview/>
            </div>
        </div>
      </div>
    );
}