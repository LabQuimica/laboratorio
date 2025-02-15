"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ValeAlumnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = [
    {
      value: "pendiente",
      label: "Pendientes",
      path: "/menu/vale/alumno/pendiente",
    },
    {
      value: "progreso",
      label: "En Progreso",
      path: "/menu/vale/alumno/progreso",
    },
    {
      value: "completada",
      label: "Completados",
      path: "/menu/vale/alumno/completada",
    },
    {
      value: "cancelada",
      label: "Cancelados",
      path: "/menu/vale/alumno/cancelada",
    },
    {
      value: "all",
      label: "Todos",
      path: "/menu/vale/alumno/todos",
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <Tabs value={pathname} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.path} asChild>
              <Link href={tab.path}>{tab.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}
