import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import NameBadge from "./NameBadge";
import { Separator } from "@/components/ui/separator";

interface DocenteHoverCardProps {
  nombre: string;
}

export function HoverDetailsDocente({ nombre }: DocenteHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <NameBadge className="h-12 w-12" nombre={nombre} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="p-4 text-center align-middle w-full">
        <div className="flex flex-row row-span-2 gap-4 space-x-2">
            <NameBadge className="h-9 w-9" nombre={nombre} />
            <div className="flex flex-col w-full justify-start items-start">
              <p className="text-sm font-semibold mb-2">{nombre}</p>
              <Separator />
              <p className="text-sm font-semibold mb-2">correo@gmail.com</p>
            </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
