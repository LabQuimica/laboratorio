"use client";

import { useContext, useEffect, useState } from "react"; // Added useState
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IconUser, IconLogout, IconEdit } from "@tabler/icons-react"; // Added IconEdit
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
  Sheet,
  SheetContent,
  SheetTrigger,
  // Import other Sheet parts if needed, like SheetClose, SheetFooter etc.
  // SheetHeader, SheetTitle, SheetDescription are used within AvatarSelectionSheet
} from "@/components/ui/sheet"; // Added Sheet components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Added Button
import { UserContext } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { AvatarSelectionSheet } from "./AvatarSelectionSheet";

export const UserMenu = () => {
  const router = useRouter();
  const { user, setUser, setLoading } = useContext(UserContext);
  const queryClient = useQueryClient();

  // State for controlling the sheet visibility
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // State to hold the selected avatar path before saving
  const [selectedAvatarPath, setSelectedAvatarPath] = useState(user?.img || "");

  // Update local state when a new avatar is selected in the sheet
  const handleAvatarSelection = (newPath: string) => {
    setSelectedAvatarPath(newPath);
  };

  // Function to handle saving the avatar change (e.g., API call)
  const handleSaveChanges = async () => {
    if (!user || selectedAvatarPath === user.img) {
      setIsSheetOpen(false); // Close sheet if no change
      return;
    }

    setLoading(true); // Indicate loading state
    console.log("Saving new avatar:", selectedAvatarPath); // Log for debugging

    // --- TODO: Implement your API call here ---
    // Example:
    // try {
    //   const response = await fetch('/api/user/update-avatar', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userId: user.id, avatar: selectedAvatarPath }),
    //   });
    //   if (!response.ok) throw new Error('Failed to update avatar');
    //   const updatedUser = await response.json();

    //   // Update user context and local storage
    //   setUser(updatedUser);
    //   localStorage.setItem("user", JSON.stringify(updatedUser));

    //   // Optionally refetch user data or invalidate queries
    //   queryClient.invalidateQueries({ queryKey: ['userData'] }); // Adjust query key as needed

    //   toast.success("Avatar actualizado con éxito!"); // Success notification
    //   setIsSheetOpen(false); // Close sheet on success
    // } catch (error) {
    //   console.error("Error updating avatar:", error);
    //   toast.error("Error al actualizar el avatar."); // Error notification
    // } finally {
    //   setLoading(false); // End loading state
    // }
    // --- End of API call example ---

    // --- Placeholder for demonstration ---
    // Simulate API call and update context/local storage
    // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    // const updatedUser = { ...user, img: selectedAvatarPath };
    // setUser(updatedUser);
    // localStorage.setItem("user", JSON.stringify(updatedUser));
    // toast.success("Avatar actualizado (simulado)!");
    // setIsSheetOpen(false);
    // setLoading(false);
    // --- End of Placeholder ---
  };

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    queryClient.removeQueries();
    router.push("/login");
  };

  // Update selectedAvatarPath if user data changes (e.g., after login)
  useEffect(() => {
    if (user?.img) {
      setSelectedAvatarPath(user.img);
    }
  }, [user?.img]);

  return (
    <>
      {/* Dialog component */}
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
                    {/* Edit Icon Overlay */}
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

              {/* Rest of the user details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Código:
                  </p>
                  <p>{user.codigo}</p>
                  <p>{selectedAvatarPath}</p>
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
        </DialogContent>
      </Dialog>

      {/* Sheet component separado */}
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

      {/* Logout item */}
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
