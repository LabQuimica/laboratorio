// src/components/AvatarSelectionSheet.tsx
import React, { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const avatarCategories = [
  { name: "adventurer-neutral", count: 10 },
  { name: "lorelei-neutral", count: 10 },
  { name: "notionists-neutral", count: 10 },
  { name: "shapes", count: 10 },
  { name: "thumbs", count: 10 },
];

const allAvatars = avatarCategories.flatMap((category) =>
  Array.from({ length: category.count }, (_, i) => {
    const imageNumber = String(i + 1).padStart(3, "0");
    const imageName = `avatar-${imageNumber}.svg`;
    return {
      category: category.name,
      path: `${category.name}/${imageName}`,
      fullPath: `/avatars/${category.name}/${imageName}`,
    };
  })
);

interface AvatarSelectionSheetProps {
  currentAvatar: string;
  onAvatarSelect: (newAvatarPath: string) => void;
}

export const AvatarSelectionSheet: React.FC<AvatarSelectionSheetProps> = ({
  currentAvatar,
  onAvatarSelect,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);

  const handleSelect = (path: string) => {
    setSelectedAvatar(path);
    onAvatarSelect(path);
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className="pt-4 pl-2">Selecciona tu Avatar</SheetTitle>
        <SheetDescription className="px-2">
          Elige una imagen de las siguientes categorías. Haz clic en guardar
          para aplicar los cambios.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="flex-grow h-[calc(100vh-180px)] mx-6">
        {" "}
        {/* Adjust height as needed */}
        <div className="py-4 px-2 space-y-6">
          {avatarCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-lg font-semibold mb-3 capitalize">
                {category.name.replace("-", " ")}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {allAvatars
                  .filter((avatar) => avatar.category === category.name)
                  .map((avatar) => (
                    <button
                      key={avatar.path}
                      onClick={() => handleSelect(avatar.path)}
                      className={cn(
                        "p-1  rounded-md border-2 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        selectedAvatar === avatar.path
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-transparent hover:border-muted-foreground/50"
                      )}
                      aria-label={`Seleccionar avatar ${avatar.path}`}
                    >
                      <Image
                        src={avatar.fullPath}
                        alt={`Avatar ${avatar.path}`}
                        width={80}
                        height={80}
                        className="rounded-md object-cover aspect-square"
                      />
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
