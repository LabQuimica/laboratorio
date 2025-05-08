import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStoreItems } from '@/stores/useStoreItems';
import { Material } from '@/types/MaterialesTypes';

interface MaterialComponentProps {
  data: Material[];
  type: 'reactivos-liquidos' | 'reactivos-solidos' | 'sensores' | 'materiales' | 'equipos';
}

const MaterialComponent: React.FC<MaterialComponentProps> = ({ data, type }) => {
  const addMaterial = useStoreItems(state => state.addMaterial);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id_item} className="overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-medium mr-2">
                {type === 'materiales' && item.especial && item.especial !== "N/A"
                  ? `${item.nombre} ${item.especial}`
                  : item.nombre
                }
              </CardTitle>
              <Badge variant={item.status === 1 ? "secondary" : "destructive"}>
                {item.status === 1 ? "Disponible" : "Agotado"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-x-2">
                <p className="text-muted-foreground">Serie:</p>
                <p>{item.num_serie}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2">
                <p className="text-muted-foreground">Marca:</p>
                <p>{item.marca}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2">
                <p className="text-muted-foreground">Ubicación:</p>
                <p>{item.ubicacion}</p>
              </div>
              
              {item.observacion && (
                <div className="col-span-2 mt-2 p-2 bg-gray-50 dark:bg-black rounded">
                  <p className="text-muted-foreground text-xs">Observaciones:</p>
                  <p className="mt-1 text-xs">{item.observacion}</p>
                </div>
              )}
            </div>
          </CardContent>

          <div className="pb-3 px-4 mt-auto space-y-2">
            <div className="text-xs text-right text-muted-foreground mt-4">
              Actualizado: {new Date(item.fecha_modificacion).toLocaleDateString()}
            </div>
          
            <Button 
              variant={"secondary"}
              className="w-full dark:text-black disabled:bg-bg-disable-light disabled:text-text-disable-light disabled:dark:bg-bg-disable-dark disabled:dark:text-text-disable-dark"
              onClick={() => addMaterial(type, item)}
              disabled={item.status === 0}
            >
              Agregar {(type === "sensores" || type === "materiales" 
                ? type.slice(0, -2) 
                : type.slice(0, -1)
              ).charAt(0).toUpperCase() + (type === "sensores" || type === "materiales" 
                ? type.slice(0, -2) 
                : type.slice(0, -1)
              ).slice(1)}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MaterialComponent;
