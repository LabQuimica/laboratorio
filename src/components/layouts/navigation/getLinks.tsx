// utils/getLinks.ts
import { links, profesorLinks } from "@/constants/links";

export const getSidebarLinks = (user: string) => {
  let linksT = [...links];

  if (user === "profesor") {
    linksT = [...linksT, ...profesorLinks];
  }

  return linksT;
};