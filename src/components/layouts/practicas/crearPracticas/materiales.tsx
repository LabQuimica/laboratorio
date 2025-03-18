"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMateriales } from "@/hooks/Items/useItems";
import MaterialView from "./materialView";

type TipoMaterial = "kits" | "sensores" | "reactivos" | "materiales" | "equipos";

export default function Materiales() {
    const tipos: TipoMaterial[] = ["kits", "sensores", "reactivos", "materiales", "equipos"];
    const [tipoActivo, setTipoActivo] = useState<TipoMaterial>("kits");
    const { data, isLoading, error } = useMateriales(tipoActivo);

    return (
        <div className="w-full">
            <Tabs
                value={tipoActivo}
                onValueChange={(value: string) => setTipoActivo(value as TipoMaterial)}
                className=""
            >
                {/* Lista de pestañas */}
                <TabsList className="grid w-full grid-cols-5">
                {tipos.map((tipo) => (
                    <TabsTrigger key={tipo} value={tipo}>
                    {tipo}
                    </TabsTrigger>
                ))}
                </TabsList>

                {/* Contenido de las pestañas */}
                {tipos.map((tipo) => (
                    <TabsContent key={tipo} value={tipo}>
                    {isLoading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p>Error al cargar los materiales: {error.message}</p>
                    ) : (
                        <MaterialView tipo={tipo} data={data} />
                    )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
