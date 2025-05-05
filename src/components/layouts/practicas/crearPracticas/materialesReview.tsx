import React, { memo, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { X } from 'lucide-react';
import { useEffect } from "react";
import { useStoreItems } from "@/stores/useStoreItems";
import { usePracticaStore } from '@/stores/practicasStore';
import { useCreatePractica } from '@/hooks/Practicas/usePractica';
import { useToast } from '@/hooks/use-toast';
import { useContext } from 'react';
import { UserContext } from "@/context/UserContext";

const MaterialesReview = () => {
    const { nombre, descripcion, numEquipos } = usePracticaStore();
    const createPractica = useCreatePractica();

    const kits = useStoreItems(state => state.kits);
    const sensores = useStoreItems(state => state.sensores);
    const reactivos = useStoreItems(state => state.reactivos);
    const material = useStoreItems(state => state.materiales);
    const equipos = useStoreItems(state => state.equipos);
    const removeMaterial = useStoreItems(state => state.removeMaterial);
    const error = useStoreItems(state => state.error);
    const updateMaterialQuantity = useStoreItems(state => state.updateMaterialQuantity);
    const { user } = useContext(UserContext);

    const { toast } = useToast();

    const handleQuantityChange = (tipo: string, material: any, newValue: string) => {
        const change = Number(newValue) - parseInt(material.cantidadActual || "1");
        updateMaterialQuantity(tipo, material.id_item, change);
    };
    
    const renderMateriales = (tipo: string, materialesList: any[]) => {
        if (materialesList.length === 0) {
            return <p className="text-gray-500 italic">No hay {tipo} agregados</p>;
          }
          
          return (
            <div className='w-full h-full'>
                <ul className="space-y-2">
                {materialesList.map((material) => (
                    <li key={material.id_item} className="flex justify-between items-center p-2">
                    <span className='text-base'>
                        {tipo === 'materiales' && material.especial !== "N/A"
                        ? `${material.nombre} ${material.especial}`
                        : material.nombre
                    }
                    </span>
                    <div className="flex items-center">
                        <Button 
                            variant="default" 
                            size="sm" 
                            className='rounded-full mr-3 bg-btn-less-light text-white dark:bg-btn-less-dark disabled:bg-bg-disable-light disabled:text-text-disable-light disabled:dark:bg-bg-disable-dark disabled:dark:text-text-disable-dark w-8 h-8 items-center justify-center align-middle'
                            onClick={() => updateMaterialQuantity(tipo, material.id_item, -1)}
                            disabled={parseInt(material.cantidadActual) <= 1}
                        >
                            <span className='font-extrabold text-xl'>-</span>
                        </Button>
                        <div className="flex items-center mx-2 px-2">
                            <input 
                                type="number"
                                min={0.1}
                                value={material.cantidadActual ?? ''}
                                onChange={
                                    (e) => {
                                        const value = e.target.value;
                                        // Permitir vacío temporalmente para que el usuario pueda escribir
                                        handleQuantityChange(tipo, material, value);
                                    }
                                }
                                className="w-16 text-sm h-8 text-center align-middle justify-center items-center bg-transparent"
                            />
                            {/* Unidad mg o ml */}
                            {tipo === "reactivos" && (
                            <span className="text-sm text-gray-500 ml-1">
                                {material.tipo === "reactivos-sólidos" ? "mg" :
                                material.tipo === "reactivos-líquidos" ? "ml" : ""}
                            </span>
                            )}
                        </div>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className='rounded-full bg-btn-less-light text-white dark:bg-btn-less-dark disabled:bg-bg-disable-light disabled:text-text-disable-light disabled:dark:bg-bg-disable-dark disabled:dark:text-text-disable-dark w-8 h-8 items-center justify-center align-middle'
                            onClick={() => updateMaterialQuantity(tipo, material.id_item, 1)}
                            disabled={parseInt(material.cantidadActual || "1") >= parseInt(material.cantidad)}
                        >
                            <span className='font-extrabold text-xl'>+</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMaterial(tipo, material.id_item)}
                            className="h-8 w-8 p-0 ml-2"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
          );
    };



    const handleCreatePractica = async () => {

        if (!nombre || !descripcion || !numEquipos) {
            toast({
                title: "Error",
                description: "Todos los campos son obligatorios",
                variant: "destructive",
            });
            return;
        }
        if (isNaN(numEquipos) || numEquipos <= 0) {
            toast({
                title: "Error",
                description: "El número de equipos debe ser un número positivo",
                variant: "destructive",
            });
            return;
        }

        const materiales = [
            ...kits.map(item => ({ itemId: item.id_item, cantidad: item.cantidadActual })),
            ...sensores.map(item => ({ itemId: item.id_item, cantidad: item.cantidadActual })),
            ...reactivos.map(item => ({ itemId: item.id_item, cantidad: item.cantidadActual })),
            ...material.map(item => ({ itemId: item.id_item, cantidad: item.cantidadActual })),
            ...equipos.map(item => ({ itemId: item.id_item, cantidad: item.cantidadActual })),
        ];

        if (materiales.length === 0) {
            toast({
                title: "Error",
                description: "No se pueden crear prácticas sin materiales.",
                variant: "destructive",
            });
            return;
        }

        const materialesFiltrados = materiales.filter(m => Number(m.cantidad) > 0);

        if (materialesFiltrados.length === 0) {
            toast({
                title: "Error",
                description: "No se pueden crear prácticas sin materiales válidos (con cantidad menor a 0.1).",
                variant: "destructive",
            });
            return;
        }
    
        const newPractica = {
            nombre,
            descripcion,
            num_equipos: numEquipos,
            creadorId: user?.id_user,
            materiales: materialesFiltrados.map(material => ({
                itemId: material.itemId,
                cantidad: Number(material.cantidad) || 0,
            })),
        };
    
        try {
            await createPractica.mutateAsync(newPractica);
            toast({
                title: "Operación exitosa",
                description: "Práctica creada exitosamente",
            });

            usePracticaStore.setState({ 
                nombre: '', 
                descripcion: '', 
                numEquipos: 1
            });
            kits.forEach(item => removeMaterial('kits', item.id_item));
            sensores.forEach(item => removeMaterial('sensores', item.id_item));
            reactivos.forEach(item => removeMaterial('reactivos', item.id_item));
            material.forEach(item => removeMaterial('materiales', item.id_item));
            equipos.forEach(item => removeMaterial('equipos', item.id_item));
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "No se pudo crear la práctica. Revisa las cantidades de los materiales.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (error) {
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        }
      }, [error]);

    return (
        <div>
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className='flex flex-row justify-between w-full pr-5'>
                            <p className='text-lg'>Kits</p>
                            <span className="ml-2 text-base text-gray-500">({kits.length})</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/*Aqui van los kits agregados*/}
                        {renderMateriales('kits', kits)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div className='flex flex-row justify-between w-full pr-5'>
                            <p className='text-lg'>Sensores</p>
                            <span className="ml-2 text-base text-gray-500">({sensores.length})</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/*Aqui van los sensores agregados*/}
                        {renderMateriales('sensores', sensores)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                    <div className='flex flex-row justify-between w-full pr-5'>
                            <p className='text-lg'>Reactivos</p>
                            <span className="ml-2 text-base text-gray-500">({reactivos.length})</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/*Aqui van los líquidos agregados*/}
                        {renderMateriales('reactivos', reactivos)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <div className='flex flex-row justify-between w-full pr-5'>
                            <p className='text-lg'>Materiales</p>
                            <span className="ml-2 text-base text-gray-500">({material.length})</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {/*Aqui van los sólidos agregados*/}
                        {renderMateriales('materiales', material)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            {/* Botón para crear la práctica */}
            <div className="mt-4">
                <Button 
                    onClick={handleCreatePractica} 
                    className="w-full dark:text-black"
                    variant="secondary"
                >
                    Crear Práctica
                </Button>
            </div>
        </div>
    );
}

export default memo(MaterialesReview);