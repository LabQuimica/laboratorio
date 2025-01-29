import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt, IconUser } from "@tabler/icons-react";

export const links = [
    {
        label: "Dashboard",
        href: "/menu/dashboard",
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Profile",
        href: "/menu/profile",
        icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Settings",
        href: "/settings",
        icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Users",
        href: "/menu/users",
        icon: (
            <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Inventario",
        href: "/menu/inventario",
        icon: (
            <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Logout",
        href: "/logout",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
];