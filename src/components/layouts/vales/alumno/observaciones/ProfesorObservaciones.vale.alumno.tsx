import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Row } from "@tanstack/react-table";

interface ProjectActionsProps<TData> {
  row: Row<TData>;
}

function ObservacionesValeProfesor<TData>({ row }: ProjectActionsProps<TData>) {
  const originalComment =
    String(row.getValue("observaciones_vale")) || "Ningún comentario";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {originalComment}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[800px] break-words">
          <p>{originalComment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ObservacionesValeProfesor;
