import { useInhabilitarPracticasGroup } from '@/hooks/Practicas/usePractica';
import { useGrupos } from "@/hooks/Groups/useGroups";
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
import React, { useContext, useState } from 'react';
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
import { IconArchiveOff } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

const InhabilitarTodoGrupo = () => {
  const inhabilitarPracticasGroup = useInhabilitarPracticasGroup();
  const { toast } = useToast();
  const { data: grupos, isLoading, error } = useGrupos();
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(undefined);
  const [openInhabilitarTodo, setOpenInhabilitarTodo] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleInhabilitarTodo = async (type: string, grupoId?: number) => {
    try {
      switch (type) {
        case 'grupo-todas':
          if (!grupoId) {
            throw new Error("Faltan parámetros necesarios");
          }
          await inhabilitarPracticasGroup.mutateAsync(grupoId);
          toast({
            title: "Operación exitosa",
            description: "Todas las prácticas del grupo inhabilitadas correctamente",
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

  const handleSelect = (value: string) => {
    setSelectedGroupId(value);
    setOpen(false);
  };

  return (
    <>
        <div className="z-50">
            <Button variant='destructive' className="flex flex-row rounded-sm items-center justify-center align-middle" onClick={() => setOpenInhabilitarTodo(true)}>
                <IconArchiveOff className="h-5 w-5 mr-2" /> 
                <p className="h-full">Inhabilitar por Grupo</p>
            </Button>
        </div>

        <AlertDialog open={openInhabilitarTodo} onOpenChange={setOpenInhabilitarTodo}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Inhabilitar</AlertDialogTitle>
                <AlertDialogDescription>
                    No es posible deshacer esta acción.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        <span className="truncate flex-1 text-left">
                          {selectedGroupId
                            ? grupos?.find((g) => String(g.id_grupo) === selectedGroupId)?.nombre + " " +
                              grupos?.find((g) => String(g.id_grupo) === selectedGroupId)?.semestre
                            : "Selecciona un grupo"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder= "Buscar grupo..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                          <ScrollArea className="h-[200px]">
                          <CommandGroup>
                            {grupos?.map((grupo) => (
                              <CommandItem
                                key={grupo.id_grupo}
                                value={String(grupo.id_grupo)}
                                onSelect={handleSelect}
                                className="flex items-start gap-2 py-2"
                              >
                                <div className="flex-1 break-words whitespace-normal">
                                  {grupo.nombre + " " + grupo.semestre}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                    <div className='flex w-full justify-end mt-5 space-x-5'>
                        <AlertDialogCancel className='text-white'>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="text-white"
                            disabled={!selectedGroupId}
                            onClick={() => {
                            if (selectedGroupId) {
                                handleInhabilitarTodo("grupo-todas", Number(selectedGroupId));
                            }
                            }}
                        >
                            Inhabilitar
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
};

export default InhabilitarTodoGrupo;