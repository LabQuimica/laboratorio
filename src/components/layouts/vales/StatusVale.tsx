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

interface Vale {
  id_vale: number;
  estado_vale: EstadoVale;
}

const statusStyles = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  progreso: "bg-blue-100 text-blue-800 border-blue-200",
  completada: "bg-green-100 text-green-800 border-green-200",
  cancelada: "bg-red-100 text-red-800 border-red-200",
} as const;

const statusOptions: EstadoVale[] = [
  "pendiente",
  "progreso",
  "completada",
  "cancelada",
];

interface StatusValeProps {
  row: Row<Vale>;
}
const StatusVale = ({ row }: StatusValeProps) => {
  const addChange = useStatusStore((state) => state.addChange);
  const changes = useStatusStore((state) => state.changes);

  // Obtener el estado actual desde el store
  const storedChange = changes.find(
    (c) => c.id_vale === row.getValue("id_vale")
  );
  const currentStatus: EstadoVale = storedChange
    ? storedChange.newStatus
    : row.getValue("estado_vale");

  const handleStatusChange = (newStatus: EstadoVale) => {
    addChange({
      id_vale: row.getValue("id_vale"),
      oldStatus: row.getValue("estado_vale"),
      newStatus,
    });
  };

  return (
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
            className={`${statusStyles[status]} m-1 rounded-full hover:opacity-100 transition-opacity`}
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusVale;
