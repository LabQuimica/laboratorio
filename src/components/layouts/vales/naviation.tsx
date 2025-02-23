"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UpdateVale } from "./UpdateVale";

function ValeNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header className="flex space-x-4 pt-2 justify-between">
        <div className="flex space-x-4 items-center  pl-4 ">
          <h1 className="text-lg inline  ">Vale de:</h1>
          <Button
            variant={pathname.includes("profesor") ? "default" : "outline"}
            onClick={() => router.push("/menu/vale/profesor")}
          >
            Profesor
          </Button>
          <Button
            variant={pathname.includes("alumno") ? "default" : "outline"}
            onClick={() => router.push("/menu/vale/alumno")}
          >
            Alumno
          </Button>
        </div>
        <div className="pr-4">
          <UpdateVale />
        </div>
      </header>
    </>
  );
}

export default ValeNavigation;
