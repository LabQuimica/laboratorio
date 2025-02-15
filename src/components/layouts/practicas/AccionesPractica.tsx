import { usePracticas } from '@/hooks/Practicas/usePractica';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface PracticaActionsProps {
  idPractica: number;
}

const PracticaActions = ({ idPractica}: PracticaActionsProps) => {

  const { deletePractica } = usePracticas();

  const handleDeleteClick = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta práctica?")) {
      try {
        await deletePractica({ idPractica, profesorId: 5 });
        alert("Práctica eliminada correctamente");
      } catch (error) {
        console.error("Error eliminando la práctica:", error);
        alert("No se pudo eliminar la práctica");
      }
    }
  };

  return (
    <div className="flex gap-2 w-full items-center justify-center">
      {/* Botón de modificar (lógica pendiente) */}
      <button
        className="text-white hover:bg-primary-blue-light p-2"
        title="Modificar práctica"
      >
        <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      </button>

      {/* Botón de eliminar con confirmación */}
      <button
        onClick={handleDeleteClick}
        className="text-white hover:bg-primary-blue-light p-2"
        title="Eliminar práctica"
      >
        <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      </button>
    </div>
  );
};

export default PracticaActions;
