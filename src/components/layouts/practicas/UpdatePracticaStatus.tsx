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
import {
  IconArrowNarrowRight,
  IconFlask2Filled,
  IconTrash,
} from "@tabler/icons-react";
import { usePracticaStore } from "@/stores/practicasStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useUpdateVales } from "@/hooks/Vales/useUpdateVale";
import statusStylesPractica from "./SatusStylesPractica";
import { useUpdatePracticaStatus } from "@/hooks/Practicas/usePractica";

export function UpdatePracticaStatus() {
  const {
    statusChanges,
    clearStatusChanges,
    removeStatusChangeById,
  } = usePracticaStore();

  const { toast } = useToast();
  const updateMutation = useUpdatePracticaStatus();

  const allChanges = [...statusChanges];
  const hasChanges = allChanges.length > 0;

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync({ statusChanges });
      toast({
        title: "Actualización exitosa",
        description:
          "Los estados de prácticas han sido actualizados.",
      });
      clearStatusChanges();
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron actualizar los estados ${
          (error as any)?.message || ""
        }`,
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"default"}
          disabled={!hasChanges}
          className="bg-black text-white dark:bg-white dark:text-black "
        >
          <IconFlask2Filled className="mr-2" />
          Actualizar Registros
          {hasChanges && (
            <span className="ml-2 bg-white dark:bg-gray-800 text-black  dark:text-white px-2 py-0.5 rounded-full text-xs ">
              {allChanges.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[30rem]">
        <SheetHeader>
          <SheetTitle>Cambios Pendientes de Práctica</SheetTitle>
          <SheetDescription>
            Revisa los cambios antes de confirmar la actualización. Esta acción
            actualizará el estado y los comentarios de las prácticas seleccionadas.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80%] mt-4 rounded-md border p-4">
          {hasChanges ? (
            allChanges.map((change, index) => (
              <div
                key={`${change.id_practica}-${index}`}
                className="mb-4 p-3 border rounded-lg "
              >
                <div className="flex justify-between items-center content-center">
                  <span className="text-sm">Vale ID: {change.id_practica}</span>
                  <span className="text-sm text-gray-500">
                    Tipo: {(change as any).tableType}
                  </span>
                  <Button
                    variant="default"
                    className="bg-red-700 hover:bg-red-600"
                    size="icon"
                    onClick={() => {
                      if ("oldStatus" in change) {
                        removeStatusChangeById(change.id_practica);
                      }
                    }}
                  >
                    <IconTrash />
                  </Button>
                </div>

                {"oldStatus" in change && (
                  <div className="mt-2 flex gap-2 items-center">
                    <span
                      className={`w-28 text-center px-2 py-1 rounded-full text-sm ${
                        statusStylesPractica[change.oldStatus]
                      }`}
                    >
                      {change.oldStatus}
                    </span>
                    <IconArrowNarrowRight />
                    <span
                      className={`w-28 text-center px-2 py-1 rounded-full text-sm ${
                        statusStylesPractica[change.newStatus]
                      }`}
                    >
                      {change.newStatus}
                    </span>
                  </div>
                )}
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
            variant="default"
            onClick={() => {
              clearStatusChanges();
            }}
            disabled={!hasChanges}
            className="w-[90%] mx-auto font-bold bg-red-700 hover:bg-red-600"
          >
            Limpiar
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className="w-[90%] mx-auto font-bold "
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
