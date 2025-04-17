"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserContext } from "@/context/UserContext";

export const UserMenu = () => {
  const router = useRouter();
  const { user, setUser, setLoading } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    queryClient.removeQueries();
    router.push("/login");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            <IconUser className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Perfil de Usuario</DialogTitle>
            <DialogDescription>
              Información detallada de tu cuenta.
            </DialogDescription>
          </DialogHeader>
          {user ? (
            <div className="grid gap-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`/avatars/${user.img}`}
                      alt={user.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-md font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {user.rol}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Código:
                  </p>
                  <p>{user.codigo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Fecha de registro:
                  </p>
                  <p>{new Date(user.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No se pudo cargar la información del usuario.
            </div>
          )}
          {/* <DialogFooter>
            <Button type="submit">Salvar cambios</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>

      <DropdownMenuItem
        className="cursor-pointer text-rose-600 dark:text-red-500"
        onClick={handleLogout}
      >
        <IconLogout className="mr-2 h-4 w-4" />
        <span>Cerrar sesión</span>
      </DropdownMenuItem>
    </>
  );
};
