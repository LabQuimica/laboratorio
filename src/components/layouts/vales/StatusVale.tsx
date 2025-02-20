import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStatusStore } from "@/stores/valesStore";
import { EstadoVale } from "@/types/ValeTypes";
import { Row } from "@tanstack/react-table";

const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950 ",
  cancelada: "bg-rose-300 text-red-950 ",
  incompleto: "bg-stone-300 text-stone-950 ",
} as const;

const statusOptions: EstadoVale[] = [
  "pendiente",
  "progreso",
  "completada",
  "cancelada",
  "incompleto",
];

interface Vale {
  id_vale: number;
  estado_vale: EstadoVale;
}
interface StatusValeProps {
  row: Row<Vale>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

const StatusVale = ({ row, tableType }: StatusValeProps) => {
  const addChange = useStatusStore((state) => state.addStatusChange);
  const changes = useStatusStore((state) => state.statusChanges);
  const id_vale = Number(row.getValue("id_vale"));
  const storedChange = changes.find((c) => c.id_vale === id_vale);

  const currentStatus: EstadoVale = storedChange
    ? storedChange.newStatus
    : row.getValue("estado_vale");

  const handleStatusChange = (newStatus: EstadoVale) => {
    addChange({
      id_vale: id_vale,
      oldStatus: row.getValue("estado_vale"),
      newStatus,
      tableType,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Select onValueChange={handleStatusChange} value={currentStatus}>
        <SelectTrigger
          className={`w-32 h-8 border rounded-full ${statusStyles[currentStatus]}`}
        >
          <SelectValue>{currentStatus}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className={`${statusStyles[status]} mt-2 rounded-full hover:opacity-100 transition-opacity`}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusVale;
