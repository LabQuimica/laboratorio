import { SidebarLink } from "@/components/ui/sidebar";
import { getSidebarLinks } from "./getLinks";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export const SidebarLinks = () => {
  const { user } = useContext(UserContext);
  
  if (!user) return null;

  const links = getSidebarLinks(user.rol);

  return (
    <div className="mt-8 flex flex-col gap-2">
      {links.map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  );
};
