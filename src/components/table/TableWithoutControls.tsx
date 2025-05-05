"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import TablePagination from "./TablePagination";

interface TableWithoutControlsProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  isError: boolean;
  orderBy: string;
}

export function TableWithoutControls<TData>({
  data,
  columns,
  isLoading,
  isError,
  orderBy,
}: TableWithoutControlsProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {}, // no globalFilter aquí
    onGlobalFilterChange: () => {}, // noop
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: orderBy, desc: false }],
    },
  });

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="py-3">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 hover:dark:bg-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-4 text-sm text-gray-800 dark:text-gray-200 break-words"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
