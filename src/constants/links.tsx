import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconChecklist,
  IconFileAnalytics,
  IconUsers,
  IconBook,
} from "@tabler/icons-react";

export const links = [
  {
    label: "Dashboard",
    href: "/menu/dashboard",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Prácticas",
    href: "/menu/practica",
    icon: (
      <IconFileAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Vales",
    href: "/menu/vale",
    icon: (
      <IconChecklist className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Usuarios registrados",
    href: "/menu/users",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Manuales",
    href: "/menu/manuales",
    icon: (
      <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
