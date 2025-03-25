import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePracticaById } from "@/hooks/Practicas/usePractica";
import { useUpdatePractica } from "@/hooks/Practicas/usePractica";
import { useDeleteMaterialPractica } from "@/hooks/Practicas/usePractica";
import { useToast } from "@/hooks/use-toast";
import { Practica } from "@/types/PracticaTypes";
import { Material } from "@/types/MaterialesTypes";
import PracticaDetailsForm from "./PracticaDetailsForm";
import PracticaMaterialesList from "./PracticaMaterialesList";

interface EditPracticaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idPractica: number;
}

const EditPractica = ({
  open,
  onOpenChange,
  idPractica,
}: EditPracticaProps) => {
  const { data: practica, isLoading } = usePracticaById(idPractica);
  const updatePractica = useUpdatePractica();
  const deleteMaterialPractica = useDeleteMaterialPractica();
  const [hasErrors, setHasErrors] = useState(false);

  const { toast } = useToast();

  const [originalData, setOriginalData] = useState<Partial<Practica>>({
    nombre: "",
    descripcion: "",
    materiales: [],
  });

  const [formData, setFormData] = useState<Partial<Practica>>({
    nombre: "",
    descripcion: "",
    materiales: [],
  });

  const [materialsToDelete, setMaterialsToDelete] = useState<number[]>([]);

  useEffect(() => {
    if (practica) {
      const initialData = {
        nombre: practica.nombre,
        descripcion: practica.descripcion,
        materiales: practica.materiales || [],
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [practica]);

  const handleDetailsChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleMaterialChange = (index: number, field: string, value: any) => {
    const updatedMaterials = [...(formData.materiales || [])];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setFormData({ ...formData, materiales: updatedMaterials });
  };

  const handleAddMaterial = (material: Material) => {
    const materialExists = formData.materiales?.some(
      (mat) => mat.id_item === material.id_item
    );

    if (!materialExists) {
      const updatedMateriales = [...(formData.materiales || []), material];
      setFormData({
        ...formData,
        materiales: updatedMateriales,
      });
      return true;
    } else {
      return false;
    }
  };

  const handleRemoveMaterial = (materialId: number) => {
    const existedInOriginal = originalData.materiales?.some(
      (material) => material.id_item === materialId
    );
    if (existedInOriginal) {
      setMaterialsToDelete((prev) => [...prev, materialId]);
    }

    setFormData((prevFormData) => {
      const updatedMateriales =
        prevFormData.materiales?.filter(
          (material) => material.id_item !== materialId
        ) || [];

      return {
        ...prevFormData,
        materiales: updatedMateriales,
      };
    });

    console.log("Material marcado para eliminar");
  };

  const handleSubmit = async () => {
    if (hasErrors) {
      toast({
        title: "No se pueden guardar los cambios",
        description:
          "Hay errores en los materiales. Por favor revise las cantidades.",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const materialId of materialsToDelete) {
        await deleteMaterialPractica.mutateAsync({
          practicaId: idPractica,
          materialId: materialId,
        });
      }

      await updatePractica.mutateAsync({ id: idPractica, data: formData });

      setMaterialsToDelete([]);
      setOriginalData(formData);
      onOpenChange(false);

      toast({
        title: "Cambios guardados",
        description: "Los cambios se guardaron correctamente",
        variant: "default",
      });
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      toast({
        title: "Error al guardar los cambios",
        description: "Ocurrió un error al intentar guardar los cambios",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[30rem] h-full overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Editar Práctica</SheetTitle>
          <SheetDescription>
            Modifique los datos de la práctica
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid gap-4 py-4">
            {/* Nombre y descripcion de practica */}
            <PracticaDetailsForm
              id_practica={idPractica}
              nombre={formData.nombre || ""}
              descripcion={formData.descripcion || ""}
              onChange={handleDetailsChange}
            />

            {/* Materiales de practica */}
            <PracticaMaterialesList
              materiales={formData.materiales || []}
              practicaId={idPractica}
              onMaterialChange={handleMaterialChange}
              onAddMaterial={handleAddMaterial}
              onRemoveMaterial={handleRemoveMaterial}
              onErrorsChange={setHasErrors}
            />
          </div>
        )}

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                if (originalData) {
                  setFormData(originalData);
                }
                onOpenChange(false);
              }}
            >
              Cancelar
            </Button>
          </SheetClose>
          <Button onClick={handleSubmit} disabled={updatePractica.isPending}>
            Guardar cambios
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditPractica;
