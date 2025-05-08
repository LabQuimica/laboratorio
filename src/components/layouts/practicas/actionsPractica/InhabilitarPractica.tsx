import { useDeletePractica, useInhabilitarPractica, useInhabilitarPracticaByGroup, useInhabilitarPracticasGroup } from '@/hooks/Practicas/usePractica';
import { useGruposPractica } from "@/hooks/Groups/useGroups";
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
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from 'react';
import { UserContext } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';

interface InhabilitarPracticaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idPractica: number;
}

const InhabilitarPractica = ({ open, onOpenChange, idPractica }: InhabilitarPracticaProps) => {
  const inhabilitarPracticaByGroup = useInhabilitarPracticaByGroup();
  const inhabilitarPractica = useInhabilitarPractica();
  const { toast } = useToast();
  const { data: grupos, isLoading, error } = useGruposPractica(idPractica);
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(undefined);

  const handleInhabilitar = async (type: string, practicaId?: number, grupoId?: number) => {
    console.log("Datos:", type, practicaId, grupoId)
    try {
      switch (type) {
        case 'practica-grupo':
          if (!practicaId || !grupoId) {
            throw new Error("Faltan datos necesarios");
          }
          await inhabilitarPracticaByGroup.mutateAsync({ practicaId, groupId: grupoId });
          toast({
            title: "Operación exitosa",
            description: "Práctica inhabilitada para el grupo correctamente",
          });
          break;
  
        case 'practica-todos':
          if (!practicaId) {
            throw new Error("Faltan parámetros necesarios");
          }
          await inhabilitarPractica.mutateAsync(practicaId);
          toast({
            title: "Operación exitosa",
            description: "Práctica inhabilitada para todos los grupos correctamente",
          });
          break;
  
        default:
          throw new Error("Tipo de operación no reconocido");
      }
    } catch (error) {
      console.error("Error inhabilitando la práctica:", error);
      toast({
        title: "Error",
        description: "No se pudo inhabilitar la práctica.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inhabilitar</AlertDialogTitle>
          <AlertDialogDescription>
            No es posible deshacer esta acción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <Tabs defaultValue="group" className="w-full">
                <TabsList className="grid grid-cols-2 h-12 rounded-lg px-4">
                    <TabsTrigger value="group" className='rounded-lg h-8'>Para un grupo</TabsTrigger>
                    <TabsTrigger value="allgroups" className='rounded-lg h-8'>Para todos los grupos</TabsTrigger>
                </TabsList>
                <TabsContent value="group" className="mt-6">
                    <Select onValueChange={(value) => setSelectedGroupId(value)}>
                        <SelectTrigger className="w-full h-12">
                            <SelectValue placeholder="Selecciona un grupo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Grupos</SelectLabel>
                                {grupos?.map((grupo) => (
                                    <SelectItem key={grupo.id_grupo} value={String(grupo.id_grupo)}>
                                        {grupo.nombre + " " + grupo.semestre}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className='flex w-full justify-end mt-5 space-x-5'>
                        <AlertDialogCancel className='text-white'>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="text-white"
                            disabled={!selectedGroupId}
                            onClick={() => {
                                if (selectedGroupId) {
                                handleInhabilitar("practica-grupo", idPractica, Number(selectedGroupId));
                                }
                            }}
                        >
                            Inhabilitar
                        </AlertDialogAction>
                    </div>
                </TabsContent>
                <TabsContent value="allgroups" className="mt-6">
                    <div className='flex w-full justify-end mt-5 space-x-5'>
                        <AlertDialogCancel className='text-white'>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="text-white"
                            onClick={() => handleInhabilitar('practica-todos', idPractica)}
                        >
                            Inhabilitar
                        </AlertDialogAction>
                    </div>
                </TabsContent>
            </Tabs>
            {/* 
            <button onClick={() => handleInhabilitar('grupo-todas', undefined, 2)}>
                Inhabilitar todas las prácticas del grupo
            </button>
            */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InhabilitarPractica;