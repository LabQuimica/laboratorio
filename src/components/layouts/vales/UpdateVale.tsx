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
import { useStatusStore } from "@/stores/valesStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useUpdateVales } from "@/hooks/Vales/useUpdateVale";

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950 ",
  cancelada: "bg-rose-300 text-red-950 ",
  incompleto: "bg-stone-300 text-stone-950 ",
} as const;

export function UpdateVale() {
  const {
    statusChanges,
    commentChanges,
    clearStatusChanges,
    clearCommentChanges,
    removeStatusChangeById,
    removeCommentChangeById,
  } = useStatusStore();

  const { toast } = useToast();
  const updateMutation = useUpdateVales();

  const allChanges = [...statusChanges, ...commentChanges];
  const hasChanges = allChanges.length > 0;

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync({ statusChanges, commentChanges });
      toast({
        title: "Actualización exitosa",
        description:
          "Los estados y comentarios de los vales han sido actualizados.",
      });
      clearStatusChanges();
      clearCommentChanges();
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron actualizar los estados o comentarios. ${
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
          variant={"destructive"}
          disabled={!hasChanges}
          className="font-bold "
        >
          <IconFlask2Filled className="mr-2" />
          Actualizar Registros
          {hasChanges && (
            <span className="ml-2 bg-white dark:bg-gray-800 text-destructive dark:text-white px-2 py-0.5 rounded-full text-xs ">
              {allChanges.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[30rem]">
        <SheetHeader>
          <SheetTitle>Cambios Pendientes de Vale</SheetTitle>
          <SheetDescription>
            Revisa los cambios antes de confirmar la actualización. Esta acción
            actualizará el estado y los comentarios de los vales seleccionados.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80%] mt-4 rounded-md border p-4">
          {hasChanges ? (
            allChanges.map((change, index) => (
              <div
                key={`${change.id_vale}-${index}`}
                className="mb-4 p-3 border rounded-lg "
              >
                <div className="flex justify-between items-center content-center">
                  <span className="text-sm">Vale ID: {change.id_vale}</span>
                  <span className="text-sm text-gray-500">
                    Tipo: {(change as any).tableType}
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      if ("oldStatus" in change) {
                        removeStatusChangeById(change.id_vale);
                      } else {
                        removeCommentChangeById(change.id_vale);
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
                        statusStyles[change.oldStatus]
                      }`}
                    >
                      {change.oldStatus}
                    </span>
                    <IconArrowNarrowRight />
                    <span
                      className={`w-28 text-center px-2 py-1 rounded-full text-sm ${
                        statusStyles[change.newStatus]
                      }`}
                    >
                      {change.newStatus}
                    </span>
                  </div>
                )}
                {"oldObservation" in change && (
                  <div className="mt-2">
                    <div className="text-sm font-medium">Comentario:</div>
                    <div className="mt-1">
                      <span className="text-gray-500">Anterior:</span>{" "}
                      {change.oldObservation || "Sin comentario"}
                    </div>
                    <div className="mt-1">
                      <span className="text-gray-500">Nuevo:</span>{" "}
                      {change.newObservation || "Sin comentario"}
                    </div>
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
            variant="destructive"
            onClick={() => {
              clearStatusChanges();
              clearCommentChanges();
            }}
            disabled={!hasChanges}
            className="w-[90%] mx-auto font-bold"
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
