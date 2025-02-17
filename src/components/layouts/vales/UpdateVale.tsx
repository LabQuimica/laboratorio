"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { IconArrowNarrowRight, IconFlask2Filled } from "@tabler/icons-react";
import { useStatusStore } from "@/stores/valesStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUpdateVales } from "@/hooks/Vales/useUpdateVale";
import { useToast } from "@/hooks/use-toast";

const statusStyles = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  progreso: "bg-sky-100 text-blue-800 border-blue-200",
  completada: "bg-green-100 text-green-800 border-green-200",
  cancelada: "bg-red-100 text-red-800 border-red-200",
  incompleto: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

export function UpdateVale() {
  const changes = useStatusStore((state) => state.changes);
  const clearChanges = useStatusStore((state) => state.clearChanges);
  const { toast } = useToast();
  const updateMutation = useUpdateVales();

  const hasChanges = changes.length > 0;

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync(changes);
      toast({
        title: "Actualización exitosa",
        description: "Los estados de los vales han sido actualizados.",
      });
      clearChanges(); // Limpia los cambios después de actualizar
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron actualizar los estados. ${
          (error as any)?.message || ""
        }`,
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <div className="flex items-center justify-center ">
        <SheetTrigger asChild>
          <Button
            className="bg-destructive dark:bg-destructive dark:text-white"
            disabled={!hasChanges}
          >
            <IconFlask2Filled className="mr-2" />
            Actualizar Registros
            {hasChanges && (
              <span className="ml-2 bg-white dark:bg-gray-800 text-destructive dark:text-white px-2 py-0.5 rounded-full text-xs">
                {changes.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent className="w-[200px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Cambios Pendientes de Vale</SheetTitle>
          <SheetDescription>
            Revisa los cambios antes de confirmar la actualización. Esta acción
            actualizará el estado de los vales seleccionados.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[70vh] mt-4 rounded-md border p-4">
          {changes.length > 0 ? (
            changes.map((change, index) => (
              <div
                key={`${change.id_vale}-${index}`}
                className="mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Vale ID: {change.id_vale}</span>
                </div>
                <div className="mt-2 flex gap-2 items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      statusStyles[change.oldStatus]
                    }`}
                  >
                    {change.oldStatus}
                  </span>
                  <IconArrowNarrowRight />
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      statusStyles[change.newStatus]
                    }`}
                  >
                    {change.newStatus}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No hay cambios pendientes
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="mt-4 flex flex-col gap-8">
          <Button
            variant="destructive"
            onClick={clearChanges}
            disabled={!hasChanges}
            className="w-[90%] mx-auto font-bold"
          >
            Limpiar
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className="w-[90%] mx-auto font-bold  dark:bg-gray-800"
          >
            {updateMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Actualizando...
              </div>
            ) : (
              "Actualizar"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
