import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { IconEdit, IconTrash, IconHandFinger, IconArchiveOff } from '@tabler/icons-react';
import DeletePractica from "./actionsPractica/DeletePractica";
import AsignarPractica from "./actionsPractica/AsignarPractica";
import EditPractica from "./actionsPractica/EditarPractica";
import InhabilitarPractica from "./actionsPractica/InhabilitarPractica";

interface PracticaActionsProps {
  idPractica: number;
  estaAsignada: number;
  viewType: "creadas" | "archivadas";
}

const PracticaActions = ({ idPractica, estaAsignada, viewType}: PracticaActionsProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openAsignar, setOpenAsignar] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [openInhabilitar, setOpenInhabilitar] = useState(false);

  const isCreadas = viewType === "creadas";
  const isArchivadas = viewType === "archivadas";

  return (
    <div className='flex justify-center w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='p-2 rounded-sm bg-gray-200 dark:bg-bg-disable-dark hover:bg-gray-300 dark:hover:bg-gray-700'>Opciones</div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {isCreadas && (
            <>
              <DropdownMenuItem onSelect={() => setOpenModificar(true)} className="cursor-pointer">
                <IconEdit className="h-5 w-5 mr-2" /> Editar
              </DropdownMenuItem>

              {!estaAsignada && (
                <DropdownMenuItem onSelect={() => setOpenAsignar(true)} className="cursor-pointer">
                  <IconHandFinger className="h-5 w-5 mr-2" /> Asignar
                </DropdownMenuItem>
              )}

              {estaAsignada === 1 && (
                <DropdownMenuItem onSelect={() => setOpenInhabilitar(true)} className="text-red-600 cursor-pointer">
                  <IconArchiveOff className="h-5 w-5 mr-2" /> Inhabilitar
                </DropdownMenuItem>
              )}
            </>
          )}

          {isArchivadas && (
            <DropdownMenuItem onSelect={() => setOpenDelete(true)} className="text-red-600 cursor-pointer">
              <IconTrash className="h-5 w-5 mr-2" /> Eliminar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal para eliminar practica*/}
      <DeletePractica 
        open={openDelete} 
        onOpenChange={setOpenDelete} 
        idPractica={idPractica} 
      />

      {/* Modal para asignar practica */}
      {isCreadas && !estaAsignada && (
        <AsignarPractica 
          open={openAsignar} 
          onOpenChange={setOpenAsignar} 
          idPractica={idPractica} 
        />
      )}

      {/* Modal para editar practica */}
      {isCreadas && openModificar && (
        <EditPractica 
          open={openModificar} 
          onOpenChange={setOpenModificar} 
          idPractica={idPractica} 
        />
      )}

      {/* Modal para inhabilitar practica*/}
      {isCreadas && estaAsignada === 1 && (
        <InhabilitarPractica
          open={openInhabilitar} 
          onOpenChange={setOpenInhabilitar} 
          idPractica={idPractica} 
        />
      )}
    </div>
  );
};

export default PracticaActions;