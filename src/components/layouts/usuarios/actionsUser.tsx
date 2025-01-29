"use client";

import { Row } from "@tanstack/react-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconFlask2Filled } from "@tabler/icons-react";

interface ProjectActionsProps<TData> {
  row: Row<TData>;
}

export function ActionUser<TData>({ row }: ProjectActionsProps<TData>) {
  return (
    <Sheet>
      <div className="flex items-center justify-center">
        <SheetTrigger>
          <IconFlask2Filled className=" text-violet-500" />
        </SheetTrigger>
      </div>
      <SheetContent className="w-[200px] sm:w-[540px] ">
        <SheetHeader>
          <SheetTitle>Vale de: {row.getValue("alumno")}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}