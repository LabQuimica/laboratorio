import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Material } from "@/types/MaterialesTypes";
import { useAllMaterials } from "@/hooks/Items/useItems";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useDeleteMaterialPractica } from "@/hooks/Practicas/usePractica";
import { useToast } from '@/hooks/use-toast';

interface PracticaMaterialesListProps {
  materiales: Material[];
  practicaId: number;
  onMaterialChange: (index: number, field: string, value: any) => void;
  onAddMaterial: (material: Material) => boolean;
  onRemoveMaterial?: (materialId: number) => void;
  onErrorsChange: (hasErrors: boolean) => void;
}

const PracticaMaterialesList = ({ 
  materiales, 
  practicaId,
  onMaterialChange, 
  onAddMaterial,
  onRemoveMaterial,
  onErrorsChange
}: PracticaMaterialesListProps) => {
  const { data: allMaterials, isLoading: isMaterialsLoading, error: materialsError } = useAllMaterials();
  const { toast } = useToast();
  const deleteMaterial = useDeleteMaterialPractica();
  const [searchTerm, setSearchTerm] = useState("");
  const [openCommand, setOpenCommand] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<{ practicaId: number, materialId: number } | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  
  const getFilteredMaterials = () => {
    if (!allMaterials) return [];
    
    const filtered = allMaterials.filter(material => 
      material.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Para mostrar solo los primeros 5 elementos
    return filtered.slice(0, 5);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddMaterial = (material: Material) => {
    const success = onAddMaterial(material);
    if (success) {
      setOpenCommand(false);
    } else {
      setOpenCommand(false);
      toast({
        title: "Este material ya está en la lista",
        description: "Puede modificar la cantidad si lo requiere",
        variant: "destructive",
      });
    }
  };

  const openDeleteDialog = (practicaId: number, materialId: number) => {
    setMaterialToDelete({ practicaId, materialId });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (materialToDelete) {
      if (onRemoveMaterial) {
        onRemoveMaterial(materialToDelete.materialId);
      }
      setIsDeleteDialogOpen(false);
      setMaterialToDelete(null);
    }
  };

  const handleQuantityChange = (index: number, materialId: number, value: number) => {
    const maxQuantity = Number(allMaterials?.find(m => m.id_item === materialId)?.cantidad) || Infinity;
    let errorMessage = "";

    if (value < 1) {
      errorMessage = "La cantidad mínima debe ser 1";
    } else if (value > maxQuantity) {
      errorMessage = `La máxima cantidad disponible es ${maxQuantity}`;
    }

    setErrors(prevErrors => {
      const newErrors = {
        ...prevErrors,
        [materialId]: errorMessage,
      };
      const hasAnyError = Object.values(newErrors).some(error => error !== "");
      onErrorsChange(hasAnyError);
      return newErrors;
    });

    if (!errorMessage) {
      onMaterialChange(index, "cantidad", value);
    }
  };

  return (
    <>
    <ScrollArea>
      <div className="space-y-4">
        <Card className="dark:bg-neutral-900">
          <CardHeader>
            <CardTitle>Materiales</CardTitle>
          </CardHeader>

          <CardContent>
          {materiales.length > 0 ? (
              <div className="space-y-2">
                {materiales.map((material, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Input value={material.nombre} disabled className="w-3/4 shadow-none"/>
                      <Input
                        type="number"
                        value={material.cantidad}
                        className="w-1/4 shadow-none outline-transparent"
                        onChange={(e) => handleQuantityChange(index, material.id_item, Number(e.target.value))}
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-1/12"
                        onClick={() => openDeleteDialog(practicaId, material.id_item)}
                        disabled={deleteMaterial.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors[material.id_item] && (
                      <p className="text-red-500 text-sm">{errors[material.id_item]}</p>
                    )}
                  </div>
                ))}
              </div>
              ) : (
                <p className="text-sm text-gray-500">No hay materiales agregados</p>
              )}

              <Button variant="outline" onClick={() => setOpenCommand(true)} className="w-1/2 mt-3">
                Agregar Material
              </Button>

              {openCommand && (
                <div className="mt-2">
                  <Command className="rounded-lg border shadow-md w-full">
                    <CommandInput 
                      placeholder="Buscar material..." 
                      value={searchTerm} 
                      onValueChange={handleSearchChange}
                    />
                    <CommandList>
                      <CommandEmpty>No se encontraron materiales</CommandEmpty>
                      {isMaterialsLoading ? (
                        <p className="p-2 text-center">Cargando materiales...</p>
                      ) : materialsError ? (
                        <p className="p-2 text-center text-red-500">Error al cargar materiales</p>
                      ) : (
                        getFilteredMaterials().map((material) => (
                          <CommandItem key={material.id_item} onSelect={() => handleAddMaterial(material)}>
                            {material.nombre}
                          </CommandItem>
                        ))
                      )}
                      {allMaterials && getFilteredMaterials().length < allMaterials.filter(m => 
                        m.nombre.toLowerCase().includes(searchTerm.toLowerCase())).length && (
                        <p className="text-xs text-gray-500 p-2 text-center">
                          Mostrando 5 de {allMaterials.filter(m => 
                            m.nombre.toLowerCase().includes(searchTerm.toLowerCase())).length} resultados
                        </p>
                      )}
                    </CommandList>
                  </Command>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>

    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro de eliminar el material?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción eliminará el material seleccionado de la práctica
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="text-black dark:text-white">Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default PracticaMaterialesList;