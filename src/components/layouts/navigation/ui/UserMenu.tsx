"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconUser, IconLogout, IconEdit } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { AvatarSelectionSheet } from "./AvatarSelectionSheet";
import { updateUserAvatar } from "@/services/userService";

export const UserMenu = () => {
  const router = useRouter();
  const { user, setUser, setLoading } = useContext(UserContext);
  const queryClient = useQueryClient();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedAvatarPath, setSelectedAvatarPath] = useState(user?.img || "");

  const handleAvatarSelection = (newPath: string) => {
    setSelectedAvatarPath(newPath);
  };

  const handleSaveChanges = async () => {
    console.log("Saving new avatar:", selectedAvatarPath);
    try {
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const { img } = await updateUserAvatar(user.id_user, selectedAvatarPath);
      setUser({ ...user, img });
      localStorage.setItem("user", JSON.stringify({ ...user, img }));

      toast({
        title: "Avatar actualizado con éxito!",
        description: "El avatar se ha actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar el avatar.",
        description: "Por favor, inténtelo de nuevo.",
      });
    }
  };

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    queryClient.removeQueries();
    router.push("/login");
  };

  useEffect(() => {
    if (user?.img) {
      setSelectedAvatarPath(user.img);
    }
  }, [user?.img]);

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
              Información detallada de tu cuenta. Haz clic en el avatar para
              cambiarlo.
            </DialogDescription>
          </DialogHeader>
          {user ? (
            <div className="grid gap-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Botón para abrir el Sheet */}
                  <button
                    className="relative group rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Cambiar avatar"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar propagación
                      setIsSheetOpen(true);
                    }}
                  >
                    <Avatar className="h-16 w-16 cursor-pointer">
                      <AvatarImage
                        src={`/avatars/${selectedAvatarPath || user.img}`}
                        alt={user.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-opacity duration-200">
                      <IconEdit className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </button>
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
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveChanges}
              disabled={selectedAvatarPath === user?.img}
            >
              Salvar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="flex flex-col w-[30rem]  p-0">
          {user && (
            <AvatarSelectionSheet
              currentAvatar={user.img}
              onAvatarSelect={handleAvatarSelection}
            />
          )}
        </SheetContent>
      </Sheet>

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
