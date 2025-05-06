"use client";

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMateriales } from "@/hooks/Items/useItems";
import MaterialView from "./materialView";
import { Material } from '@/types/MaterialesTypes';
import { Input } from "@/components/ui/input";
import { IconSearch } from '@tabler/icons-react';

type TipoMaterial = "kits" | "sensores" | "reactivos" | "materiales" | "equipos";

export default function Materiales() {
    const tipos: TipoMaterial[] = ["kits", "sensores", "reactivos", "materiales", "equipos"];
    const [tipoActivo, setTipoActivo] = useState<TipoMaterial>("kits");
    const { data, isLoading, error } = useMateriales(tipoActivo);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo<Material[]>(() => {
        if (!data) return [];
        const query = searchQuery.toLowerCase();
        return data.filter((item: Material) => 
          item.nombre.toLowerCase().includes(query) ||
          (item.marca && item.marca.toLowerCase().includes(query)) ||
          (item.num_serie && item.num_serie.toLowerCase().includes(query)) ||
          (item.tipo === 'kits' && 'contenido_kit' in item && typeof item.contenido_kit === 'string' && item.contenido_kit.toLowerCase().includes(query)) ||
          (item.tipo === 'materiales' && typeof item.especial === 'string' && item.especial.toLowerCase().includes(query))
        );
      }, [searchQuery, data]);

    return (
        <div className="w-full">
            <div className="relative w-full max-w-sm py-4">
                <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <IconSearch stroke={2} />
                </span>
                <Input
                    type="text"
                    placeholder="Buscar materiales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-4 py-5 rounded-full border shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
            </div>
            
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
                        <MaterialView tipo={tipo} data={filteredData} />
                    )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
