import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { IconEdit, IconTrash, IconHandFinger } from '@tabler/icons-react';
import DeletePractica from "./actionsPractica/DeletePractica";
import AsignarPractica from "./actionsPractica/AsignarPractica";
import EditPractica from "./actionsPractica/EditarPractica";

interface PracticaActionsProps {
  idPractica: number;
  estaAsignada: number;
}

const PracticaActions = ({ idPractica, estaAsignada}: PracticaActionsProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openAsignar, setOpenAsignar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);

  return (
    <div className='flex justify-center w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='p-2 rounded-sm bg-gray-200 dark:bg-bg-disable-dark hover:bg-gray-300 dark:hover:bg-gray-700'>Opciones</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenModificar(true)}>
            <IconEdit className="h-5 w-5 mr-2" /> Editar
          </DropdownMenuItem>

          {!estaAsignada && (
          <DropdownMenuItem onSelect={() => setOpenAsignar(true)}>
            <IconHandFinger className="h-5 w-5 mr-2" /> Asignar
          </DropdownMenuItem>
          )}

          <DropdownMenuItem onSelect={() => setOpenDelete(true)} className="text-red-600">
            <IconTrash className="h-5 w-5 mr-2" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal para eliminar practica*/}
      <DeletePractica 
        open={openDelete} 
        onOpenChange={setOpenDelete} 
        idPractica={idPractica} 
      />

      {/* Modal para asignar practica */}
      {!estaAsignada && (
        <AsignarPractica 
          open={openAsignar} 
          onOpenChange={setOpenAsignar} 
          idPractica={idPractica} 
        />
      )}

      {/* Modal para editar practica */}
      <EditPractica 
        open={openModificar} 
        onOpenChange={setOpenModificar} 
        idPractica={idPractica} 
      />
    </div>
  );
};

export default PracticaActions;