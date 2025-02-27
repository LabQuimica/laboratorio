import React from 'react';
import { Material, Kit } from '@/types/MaterialesTypes';
import KitComponent from './Kit';
import MaterialComponent from './Items';
interface TipoMaterialProps {
    tipo: "kits" | "sensores" | "liquidos" | "solidos";
    data: Material[] | undefined;
}

const MaterialView: React.FC<TipoMaterialProps> = ({ tipo, data }) => {
    if (!data || data.length === 0) {
      return <p>No hay materiales de tipo {tipo} disponibles.</p>;
    }
    
    if (tipo === 'kits') {
      return <KitComponent data={data as Kit[]} />;
    }
  
    return <MaterialComponent type={tipo} data={data} />;
};

export default MaterialView;