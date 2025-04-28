  import React from 'react';
  import { useState } from "react";
  import { useStoreItems } from '@/stores/useStoreItems';
  import { Kit } from '@/types/MaterialesTypes';
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { IconArchiveFilled } from '@tabler/icons-react';
  import { Separator } from '@radix-ui/react-dropdown-menu';

  interface KitComponentProps {
    data: Kit[];
  }

  const KitComponent: React.FC<KitComponentProps> = ({ data }) => {
    const addMaterial = useStoreItems(state => state.addMaterial);

    const [truncated, setTruncated] = useState(true);
    const maxChars = 35;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((kit) => (
          <Card key={kit.id_item} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium mr-2">{kit.nombre}</CardTitle>
                <Badge variant={kit.status === 1 ? "secondary" : "destructive"}>
                  {kit.status === 1 ? "Disponible" : "Agotado"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col'>
              <div className="text-sm flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-x-2">
                  <p className="text-muted-foreground">Serie:</p>
                  <p>{kit.num_serie}</p>
                </div>
                  
                <div className="grid grid-cols-2 gap-x-2">
                  <p className="text-muted-foreground">Marca:</p>
                  <p>{kit.marca}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-2">
                  <p className="text-muted-foreground">Ubicación:</p>
                  <p>{kit.ubicacion}</p>
                </div>

                {kit.observacion && (
                  <div className="col-span-2 mt-2 p-2 bg-gray-50 dark:bg-black rounded">
                    <p className="text-muted-foreground text-xs">Observaciones:</p>
                    <p className="mt-1 text-xs">{kit.observacion}</p>
                  </div>
                )}
                
                {kit.contenido_kit && (
                    <div className="col-span-2 mt-2">
                      <p className="text-muted-foreground">Contenido del kit:</p>
                      <p className="mt-1 text-xs whitespace-pre-line">
                        {truncated && kit.contenido_kit.length > maxChars
                          ? `${kit.contenido_kit.slice(0, maxChars)}...`
                          : kit.contenido_kit}
                      </p>
                      {kit.contenido_kit.length > maxChars && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="text-xs mt-1 bg-btn-details text-text-details">Ver más</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>Contenido completo del kit</DialogTitle>
                            <p className="whitespace-pre-line text-sm">{kit.contenido_kit}</p>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                )}
              </div>
            </CardContent>
            <div className="pb-3 px-4 mt-auto space-y-2">
              <div className="text-xs text-right text-muted-foreground mt-4">
                Actualizado: {new Date(kit.fecha_modificacion).toLocaleDateString()}
              </div>

              <Button 
                variant={"secondary"}
                className="w-full dark:text-black disabled:bg-bg-disable-light disabled:text-text-disable-light disabled:dark:bg-bg-disable-dark disabled:dark:text-text-disable-dark"
                onClick={() => addMaterial('kits', kit)}
                disabled={kit.status === 0}
              >
                Agregar Kit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  export default KitComponent;