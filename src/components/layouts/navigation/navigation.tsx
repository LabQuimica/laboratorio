"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { ProfileOptions } from "./Profile";
import { SidebarLinks } from "./SidebarLinks";
import { cn } from "@/lib/utils";

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);

  return (
    <div className={cn("flex h-screen w-screen overflow-hidden")}>
      <Sidebar open={open} setOpen={setOpen} animate={animate}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <SidebarLinks />
          </div>
          <ProfileOptions setAnimate={setAnimate} />
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto dark:bg-background">
        {children}
      </main>
    </div>
  );
}
