import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import statusStyles from "../../vales/statusStyles";

interface PracticaDetailsFormProps {
  id_practica: number;
  nombre: string;
  descripcion: string;
  onChange: (name: string, value: string) => void;
}

const PracticaDetailsForm = ({ id_practica, nombre, descripcion, onChange }: PracticaDetailsFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const getStatusStyle = (estado: string) => {
    return (
      statusStyles[estado.toLowerCase() as keyof typeof statusStyles] || ""
    );
  };

  return (
    <div className="space-y-6 pt-2">
      <Card className="dark:bg-neutral-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle>Practica #{id_practica}</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              className="col-span-3 shadow-none"
            />
          </div>

          <Separator />

          <div className="grid grid-cols-4 items-center align-top gap-4">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleChange}
              className="col-span-3 shadow-none"
            />
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default PracticaDetailsForm;