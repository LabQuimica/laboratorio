import {
  IconBrandTabler,
  IconChecklist,
  IconFileAnalytics,
  IconUsers,
  IconBook,
  IconPackage,
} from "@tabler/icons-react";

export const links = [
  {
    label: "Dashboard",
    href: "/menu/dashboard",
    icon: <IconBrandTabler className="h-5 w-5 " />,
  },
  {
    label: "Prácticas",
    href: "/menu/practica",
    icon: <IconFileAnalytics className="h-5 w-5 " />,
  },
  {
    label: "Vales",
    href: "/menu/vale",
    icon: <IconChecklist className="h-5 w-5 " />,
  },
  {
    label: "Usuarios registrados",
    href: "/menu/users",
    icon: <IconUsers className="h-5 w-5 " />,
  },
  {
    label: "Manuales",
    href: "/menu/manuales",
    icon: <IconBook className="h-5 w-5 " />,
  },
  {
    label: "Materiales",
    href: "/menu/materiales",
    icon: (
      <IconPackage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
