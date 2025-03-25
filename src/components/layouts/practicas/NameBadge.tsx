import React from "react";

const getColorFromName = (name: string) => {
  const colors = ["#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#03A9F4"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const NameBadge = ({ nombre, className }: { nombre: string, className?: string }) => {
  const color = getColorFromName(nombre);
  const initials = getInitials(nombre);

  return (
    <div className="items-center justify-center align-middle text-center">
        <span
        className={`flex px-1 py-4 ${className} items-center justify-center align-middle text-white text-sm font-bold rounded-full`}
        style={{ backgroundColor: color }}
        >
        <p className="self-center">{initials}</p>
        </span>
    </div>
  );
};

export default NameBadge;
