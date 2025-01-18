"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { Logo } from "@/components/navigation/Logo";
import { ProfileLink } from "@/components/navigation/ProfileLink";
import { SidebarLinks } from "@/components/navigation/SidebarLinks";
import { cn } from "@/lib/utils";

export default function Navigation({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true);

    return (
        <div className={cn("flex h-screen w-screen overflow-hidden")}>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Logo />
                        <SidebarLinks />
                    </div>
                    <ProfileLink />
                </SidebarBody>
            </Sidebar>
            <main className="flex-1 overflow-auto dark:bg-neutral-900">
                {children}
            </main>
        </div>
    );
}
