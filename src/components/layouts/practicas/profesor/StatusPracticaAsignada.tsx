import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStatusStore } from "@/stores/valesStore";
import { EstadoPractica } from "@/types/PracticaTypes";
import { Row } from "@tanstack/react-table";
import statusStylesPractica from "../SatusStylesPractica";
import { usePracticaStore } from "@/stores/practicasStore";

const statusOptions: EstadoPractica[] = [
  "pendiente",
  "progreso",
  "completada",
  "cancelada",
  "inhabilitada",
];

interface Practica {
  id_practica: number;
  estado_practica: EstadoPractica;
}

interface StatusPracticaProps<TData> {
  row: Row<TData>;
}

function StatusPracticaAsignada<TData>({
  row,
}: StatusPracticaProps<TData>) {
  const addChange = usePracticaStore((state) => state.addStatusChange);
  const changes = usePracticaStore((state) => state.statusChanges);
  const id_practica = Number(row.getValue("id_practica"));
  const storedChange = changes.find((c) => c.id_practica === id_practica);
  const currentStatus: EstadoPractica = storedChange
    ? storedChange.newStatus
    : row.getValue("status");
  const handleStatusChange = (newStatus: EstadoPractica) => {
    addChange({
      id_practica: id_practica,
      oldStatus: row.getValue("status"),
      newStatus,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Select onValueChange={handleStatusChange} value={currentStatus}>
        <SelectTrigger
          className={`w-32 h-8 border rounded-full ${statusStylesPractica[currentStatus]}`}
        >
          <SelectValue>{currentStatus}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className={`${statusStylesPractica[status]} mt-2 rounded-full hover:opacity-100 transition-opacity`}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusPracticaAsignada;
