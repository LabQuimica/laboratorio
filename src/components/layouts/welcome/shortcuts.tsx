import { links } from "@/constants/links";


export const Shortcuts = () => {
  return (
    <div className="mt-8 flex flex-col gap-2 items-start">
      <h2 className="text-lg font-bold mb-2 text-neutral-700 dark:text-neutral-200">Inicio</h2>
      {links.slice(0, -1).map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="flex gap-2 px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md"
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
};

