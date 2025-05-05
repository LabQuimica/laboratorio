import { useState } from "react";
import { useAsignarPractica } from '@/hooks/Practicas/usePractica';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { IconCalendarEvent } from '@tabler/icons-react';
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useGrupos } from "@/hooks/Groups/useGroups";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AsignarPracticaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idPractica: number;
}

const AsignarPractica = ({ open, onOpenChange, idPractica }: AsignarPracticaProps) => {
  const asignarPractica = useAsignarPractica();
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(new Date());
  const [fechaFin, setFechaFin] = useState<Date | undefined>(new Date());
  const [inicioOpen, setInicioOpen] = useState(false);
  const [finOpen, setFinOpen] = useState(false);
  const { toast } = useToast();
  const { data: grupos = [], isLoading: loadingGrupos } = useGrupos();
  const [gruposSeleccionados, setGruposSeleccionados] = useState<number[]>([]);

  const agregarGrupo = (id: number) => {
    if (!gruposSeleccionados.includes(id)) {
      setGruposSeleccionados([...gruposSeleccionados, id]);
    }
  };

  const handleAsignarConfirm = async () => {
    if (!fechaInicio || !fechaFin || gruposSeleccionados.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar las fechas y al menos un grupo",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const formatDateTime = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss');
  
      const promesas = gruposSeleccionados.map(grupoId =>
        asignarPractica.mutateAsync({
          practica: idPractica,
          grupo: grupoId,
          fecha_inicio: formatDateTime(fechaInicio),
          fecha_fin: formatDateTime(fechaFin),
        })
      );
  
      await Promise.all(promesas);
  
      toast({
        title: "Operación exitosa",
        description: "Práctica asignada a los grupos seleccionados.",
      });
  
      onOpenChange(false);
      setGruposSeleccionados([]);
  
      setTimeout(() => {
        if (document.body.style.pointerEvents === "none") {
          document.body.style.pointerEvents = "";
        }
      }, 300);
    } catch (error) {
      console.error("Error asignando la práctica:", error);
      toast({
        title: "Error",
        description: "No se pudo asignar la práctica.",
        variant: "destructive",
      });
    }
  };  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md [&_button.absolute.top-4.right-4]:hidden">
        <DialogHeader>
          <DialogTitle>Asignar Práctica</DialogTitle>
          <DialogDescription>
            Selecciona las fechas de inicio y fin, y un grupo
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex flex-col">
              <Label htmlFor="grupo" className="mb-2">Grupo</Label>
              {loadingGrupos ? (
                <p>Cargando grupos...</p>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {gruposSeleccionados.length > 0
                      ? `Grupos: ${gruposSeleccionados
                          .map(id => grupos.find(g => g.id_grupo === id)?.nombre || id)
                          .join(', ')}`
                      : "Seleccionar grupos"}
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  {grupos.map((grupo) => (
                    <DropdownMenuItem
                      key={grupo.id_grupo}
                      onSelect={() => agregarGrupo(grupo.id_grupo)}
                    >
                      {grupo.nombre}
                    </DropdownMenuItem>
                  ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {gruposSeleccionados.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {gruposSeleccionados.map(id => {
                  const nombre = grupos.find(g => g.id_grupo === id)?.nombre || id;
                  return (
                    <Button
                      key={id}
                      variant="secondary"
                      size="sm"
                      onClick={() => setGruposSeleccionados(gruposSeleccionados.filter(gid => gid !== id))}
                    >
                      {nombre} ✕
                    </Button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col">
              <Label htmlFor="fecha-inicio" className="mb-2">Fecha de inicio</Label>
              <Popover open={inicioOpen} onOpenChange={setInicioOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="fecha-inicio"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !fechaInicio && "text-muted-foreground"
                    )}
                  >
                    <IconCalendarEvent className="mr-2 h-4 w-4" />
                    {fechaInicio ? format(fechaInicio, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fechaInicio}
                    onSelect={(date) => {
                      setFechaInicio(date);
                      setInicioOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex flex-col">
              <Label htmlFor="fecha-fin" className="mb-2">Fecha de fin</Label>
              <Popover open={finOpen} onOpenChange={setFinOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="fecha-fin"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !fechaFin && "text-muted-foreground"
                    )}
                  >
                    <IconCalendarEvent className="mr-2 h-4 w-4" />
                    {fechaFin ? format(fechaFin, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fechaFin}
                    onSelect={(date) => {
                      setFechaFin(date);
                      setFinOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            onOpenChange(false)
            setTimeout(() => {
              if (document.body.style.pointerEvents === "none") {
                document.body.style.pointerEvents = "";
              }
            }, 300);
            }}>
            Cancelar
          </Button>
          <Button onClick={handleAsignarConfirm}>
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AsignarPractica;