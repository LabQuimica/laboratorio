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
import statusStyles from "../../statusStyles";

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

interface StatusValeProps<TData> {
  row: Row<TData>;
  tableType: "ValeAlumno" | "ValeProfesor";
}

function StatusAlumnoAdministrador<TData>({
  row,
  tableType,
}: StatusValeProps<TData>) {
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
}

export default StatusAlumnoAdministrador;
