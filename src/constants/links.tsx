import {
  IconBrandTabler,
  IconChecklist,
  IconFileAnalytics,
  IconUsers,
  IconBook,
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
];
