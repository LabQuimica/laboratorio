import React from "react";
import { IconAlertCircle, IconFlask, IconSpeakerphone, IconPercentage } from '@tabler/icons-react';
import Image from "next/image";

interface ItemProps {
  id_item: number;
  nombre: string;
  cantidad: number;
  cantidad_maxima: number;
  marca: string;
}

const getStatusInfo = (porcentaje: number) => {
  if (porcentaje < 30) {
    return {
      color: "bg-red-500",
      textColor: "text-red-700 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/40",
      borderColor: "border-red-200 dark:border-red-900/50"
    };
  }
  if (porcentaje < 50) {
    return {
      color: "bg-orange-500",
      textColor: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/40",
      borderColor: "border-orange-200 dark:border-orange-900/50"
    };
  }
  return {
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/40",
    borderColor: "border-green-200 dark:border-green-900/50"
  };
};

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  const porcentaje = (item.cantidad / item.cantidad_maxima) * 100;
  const statusInfo = getStatusInfo(porcentaje);
  
  const progressWidth = `${Math.min(porcentaje, 100)}%`;
  
  return (
    <div className={`rounded-lg overflow-hidden border ${statusInfo.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200 w-full dark:shadow-neutral-900`}>
      <div className={`p-4 ${statusInfo.bgColor}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <IconFlask className={statusInfo.textColor} size={22} />
            <h3 className={`ml-2 text-lg font-bold ${statusInfo.textColor}`}>
              {item.nombre}
            </h3>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          <span className="flex items-center">
            <IconSpeakerphone size={18} className="mr-1" />
            Disponible: {item.cantidad} / {item.cantidad_maxima}
          </span>
          
          <span className="flex items-center font-medium">
            <IconPercentage size={16} className="mr-0.5" />
            {porcentaje.toFixed(1)}%
          </span>
        </div>
        
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mt-3">
          <div 
            className={`h-full ${statusInfo.color}`} 
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const AlertaInventario: React.FC<{ items: ItemProps[] }> = ({ items }) => {
  const itemsBajoStock = items.filter(item => 
    (item.cantidad / item.cantidad_maxima) * 100 < 30
  );

  const itemsOrdenados = [...itemsBajoStock].sort((a, b) => {
    const porcentajeA = (a.cantidad / a.cantidad_maxima) * 100;
    const porcentajeB = (b.cantidad / b.cantidad_maxima) * 100;
    return porcentajeA - porcentajeB;
  });

  return (
    <div className="space-y-6">
      {itemsOrdenados.length > 0 ? (
        <>
          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <IconAlertCircle className="text-red-600 dark:text-red-400 mr-2" size={24} />
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                ¡Alerta de Inventario Bajo!
              </h2>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 mt-2 ml-7">
              Los siguientes artículos tienen menos del 30% de su capacidad disponible:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {itemsOrdenados.map((item) => (
              <ItemCard key={item.id_item || `item-${item.nombre}`} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <Image 
            src="/assets/banner_inventario_lleno.svg" 
            alt="Inventario Lleno" 
            className="w-full max-w-md h-auto mb-4"
            width={500}
            height={300}
            priority={true}
          />
          <p className="text-green-600 dark:text-green-400 font-medium text-center text-lg mt-4">
            ¡Genial! Todos los artículos tienen niveles de inventario adecuados.
          </p>
        </div>
      )}
    </div>
  );
};
        
export default AlertaInventario;