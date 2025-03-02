const statusStyles = {
  pendiente: "bg-amber-300 text-amber-950",
  progreso: "bg-sky-300 text-sky-950",
  completada: "bg-green-300 text-green-950 ",
  cancelada: "bg-rose-300 text-red-950 ",
  incompleto: "bg-stone-300 text-stone-950 ",
} as const;

export default statusStyles;
