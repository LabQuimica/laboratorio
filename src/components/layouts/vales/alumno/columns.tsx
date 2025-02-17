import { Checkbox } from "@/components/ui/checkbox";
import { ActionVale } from "@/components/layouts/vales/ActionsVale";
import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Vale } from "@/types/ValeTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import StatusCell from "../StatusVale";

export const columsAlumnoVale: ColumnDef<Vale>[] = [
  // {
  //   accessorKey: "id_vale",
  //   header: ({ column }) => (
  //     <SortableHeader column={column} title="id" className="justify-center" />
  //   ),
  //   size: 10,
  //   cell: ({ row }) => (
  //     <p className="text-center"> {row.getValue("id_vale")} </p>
  //   ),
  // },
  {
    accessorKey: "alumno",
    header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
    size: 30,
  },
  {
    accessorKey: "nombre",
    header: "Materia",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <p className=" uppercase text-sm text-center leading-none">
          {row.getValue("semestre")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "estado_vale",
    header: "Estatus",
    size: 150,
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "observaciones_vale",
    header: "Observaciones",
    cell: ({ row }) => (
      <TruncatedCell text={row.getValue("observaciones_vale")} />
    ),
  },
  {
    accessorKey: "fecha_solicitada",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Fecha Solicitada"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha_solicitada")}</div>
    ),
  },
  {
    accessorKey: "profesor",
    header: "Profesor",
    size: 50,
  },
  {
    accessorKey: "nombre_practica",
    header: "Nombre Práctica",
    size: 200,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    size: 10,
    cell: ({ row }) => <ActionVale row={row} />,
  },
];

// export const columsProgreso: ColumnDef<Vale>[] = [
//   {
//     accessorKey: "id_vale",
//     header: ({ column }) => (
//       <SortableHeader column={column} title="id" className="justify-center" />
//     ),
//     size: 10,
//     cell: ({ row }) => (
//       <p className="text-center"> {row.getValue("id_vale")} </p>
//     ),
//   },
//   {
//     accessorKey: "alumno",
//     header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
//     size: 30,
//   },
//   {
//     accessorKey: "nombre",
//     header: "Materia",
//     size: 50,
//     cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
//   },
//   {
//     accessorKey: "semestre",
//     header: "Semestre",
//     size: 20,
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <div className=" h-7 w-7 rounded-md flex items-center justify-center">
//           <p className=" uppercase text-sm text-center leading-none">
//             {row.getValue("semestre")}
//           </p>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "estado_vale",
//     header: "Estatus",
//     size: 150,
//     cell: ({ row }) => <StatusCell row={row} />,
//   },
//   {
//     accessorKey: "observaciones_vale",
//     header: "Observaciones",
//     cell: ({ row }) => (
//       <TruncatedCell text={row.getValue("observaciones_vale")} />
//     ),
//     size: 100,
//   },
//   {
//     accessorKey: "fecha_solicitada",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha solicitada"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_solicitada"),
//   },
//   {
//     accessorKey: "fecha_modificacion",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha modificacion"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_modificacion"),
//   },
//   {
//     accessorKey: "profesor",
//     header: "Profesor",
//     size: 50,
//   },
//   {
//     accessorKey: "estado_practica",
//     header: "Estado Práctica",
//     size: 50,
//   },
//   {
//     accessorKey: "actions",
//     header: "Acciones",
//     size: 10,
//     cell: ({ row }) => <ActionVale row={row} />,
//   },
// ];

// export const columsCompletada: ColumnDef<Vale>[] = [
//   {
//     accessorKey: "id_vale",
//     header: ({ column }) => (
//       <SortableHeader column={column} title="id" className="justify-center" />
//     ),
//     size: 10,
//     cell: ({ row }) => (
//       <p className="text-center"> {row.getValue("id_vale")} </p>
//     ),
//   },
//   {
//     accessorKey: "alumno",
//     header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
//     size: 30,
//   },
//   {
//     accessorKey: "nombre",
//     header: "Materia",
//     size: 50,
//     cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
//   },
//   {
//     accessorKey: "semestre",
//     header: "Semestre",
//     size: 20,
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <div className=" h-7 w-7 rounded-md flex items-center justify-center">
//           <p className=" uppercase text-sm text-center leading-none">
//             {row.getValue("semestre")}
//           </p>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "estado_vale",
//     header: "Estatus",
//     size: 150,
//     cell: ({ row }) => <StatusCell row={row} />,
//   },
//   {
//     accessorKey: "observaciones_vale",
//     header: "Observaciones",
//     cell: ({ row }) => (
//       <TruncatedCell text={row.getValue("observaciones_vale")} />
//     ),
//     size: 100,
//   },
//   {
//     accessorKey: "fecha_solicitada",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha solicitada"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_solicitada"),
//   },
//   {
//     accessorKey: "fecha_modificacion",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha modificacion"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_modificacion"),
//   },
//   {
//     accessorKey: "profesor",
//     header: "Profesor",
//     size: 50,
//   },
//   {
//     accessorKey: "estado_practica",
//     header: "Estado Práctica",
//     size: 50,
//   },
//   {
//     accessorKey: "actions",
//     header: "Acciones",
//     size: 10,
//     cell: ({ row }) => <ActionVale row={row} />,
//   },
// ];

// export const columsCancelada: ColumnDef<Vale>[] = [
//   {
//     accessorKey: "id_vale",
//     header: ({ column }) => (
//       <SortableHeader column={column} title="id" className="justify-center" />
//     ),
//     size: 10,
//     cell: ({ row }) => (
//       <p className="text-center"> {row.getValue("id_vale")} </p>
//     ),
//   },
//   {
//     accessorKey: "alumno",
//     header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
//     size: 30,
//   },
//   {
//     accessorKey: "nombre",
//     header: "Materia",
//     size: 50,
//     cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
//   },
//   {
//     accessorKey: "semestre",
//     header: "Semestre",
//     size: 20,
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <div className=" h-7 w-7 rounded-md flex items-center justify-center">
//           <p className=" uppercase text-sm text-center leading-none">
//             {row.getValue("semestre")}
//           </p>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "estado_vale",
//     header: "Estatus",
//     size: 150,
//     cell: ({ row }) => <StatusCell row={row} />,
//   },
//   {
//     accessorKey: "observaciones_vale",
//     header: "Observaciones",
//     cell: ({ row }) => (
//       <TruncatedCell text={row.getValue("observaciones_vale")} />
//     ),
//     size: 100,
//   },
//   {
//     accessorKey: "fecha_solicitada",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha solicitada"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_solicitada"),
//   },
//   {
//     accessorKey: "fecha_modificacion",
//     header: ({ column }) => (
//       <SortableHeader
//         column={column}
//         title="fecha modificacion"
//         className="justify-center"
//       />
//     ),
//     cell: formatDateCell("fecha_modificacion"),
//   },
//   {
//     accessorKey: "profesor",
//     header: "Profesor",
//     size: 50,
//   },
//   {
//     accessorKey: "estado_practica",
//     header: "Estado Práctica",
//     size: 50,
//   },
//   {
//     accessorKey: "actions",
//     header: "Acciones",
//     size: 10,
//     cell: ({ row }) => <ActionVale row={row} />,
//   },
// ];
