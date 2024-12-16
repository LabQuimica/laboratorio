import { SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/constants/links";

export const SidebarLinks = () => {
    return (
        <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
            ))}
        </div>
    );
};
