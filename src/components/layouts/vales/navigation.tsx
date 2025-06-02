"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UpdateVale } from "./UpdateVale";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

function ValeNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="flex space-x-4 pt-2 justify-between">
        <div className="flex space-x-4 items-center  pl-4 ">
          <h1 className="text-lg inline  ">Vale de:</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/menu/vale/profesor")}
            className={
              pathname?.includes("profesor")
                ? "bg-black text-white dark:bg-white dark:text-black"
                : ""
            }
          >
            Profesor
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/menu/vale/alumno")}
            className={
              pathname?.includes("alumno")
                ? "bg-black text-white dark:bg-white dark:text-black"
                : ""
            }
          >
            Alumno
          </Button>
        </div>
        {user?.rol === "profesor" ? (
          <></>
        ) : (
          <div className="pr-4">
            <UpdateVale />
          </div>
        )}
      </header>
    </>
  );
}

export default ValeNavigation;
