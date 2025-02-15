"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UpdateVale } from "@/components/layouts/vales/UpdateVale";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <header className="flex space-x-4 p-4 justify-between">
        <div>
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
        <div>
          <UpdateVale />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
