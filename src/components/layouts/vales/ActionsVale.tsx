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

interface ProjectActionsProps<TData> {
  row: Row<TData>;
}

export function ActionVale<TData>({ row }: ProjectActionsProps<TData>) {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="w-[200px] sm:w-[540px]">
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
