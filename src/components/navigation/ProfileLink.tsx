import Image from "next/image";
import { SidebarLink } from "@/components/ui/sidebar";
import profile from "../../../public/images/profile.jpeg";

export const ProfileLink = () => {
    return (
        <SidebarLink
            link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                    <Image
                        src={profile}
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                    />
                ),
            }}
        />
    );
};
