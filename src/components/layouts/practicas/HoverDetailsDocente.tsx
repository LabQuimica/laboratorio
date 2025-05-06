import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import NameBadge from "./NameBadge";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDocentePractica } from "@/hooks/Practicas/profesor/useDocentePracticas";

interface DocenteHoverCardProps {
  id_practica: number;
}

export function HoverDetailsDocente({ id_practica }: DocenteHoverCardProps) {
  const { data: docentePractica, isLoading, isError } = useDocentePractica(id_practica);

  const nombre = docentePractica?.name;
  const email = docentePractica?.email;
  const rol = docentePractica?.rol;
  const img = docentePractica?.img;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <Avatar className="h-12 w-12 cursor-pointer">
            <AvatarImage src={`/avatars/${img}`} />
            <AvatarFallback>{getInitials(nombre)}</AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="p-4 text-center align-middle w-full">
        <div className="flex flex-row row-span-2 gap-4 space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/avatars/${img}`} />
              <AvatarFallback>{getInitials(nombre)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col w-full justify-start items-start">
              <div className="flex flex-row justify-between space-x-20 pb-3">
                <p className="text-md font-semibold">{nombre}</p>
                <Badge variant="secondary" className="shrink-0 h-5">
                  {rol}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
