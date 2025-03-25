import React from "react";

const getColorFromName = (name: string) => {
  const colors = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];
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

const GroupBadge = ({ grupo, className }: { grupo: string; className?: string }) => {
  const color = getColorFromName(grupo);
  const initials = getInitials(grupo);

  return (
    <div className="items-center justify-center text-center  align-middle">
      <span
        className={`flex px-1 py-4 ${className} items-center justify-center text-white text-sm font-bold rounded-full`}
        style={{ backgroundColor: color}}
      >
        <p className="self-center">{initials}</p>
      </span>
    </div>
  );
};

export default GroupBadge;