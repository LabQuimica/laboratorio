"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import TablePagination from "@/components/table/TablePagination";
import { TableControls } from "@/components/table/TableControls";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  isError: boolean;
  orderBy: string;
  reactQueryKEY: string;
  FilterComponent: React.ComponentType<{
    onFilterChange: (filters: ColumnFiltersState) => void;
  }>;
}

export const Table = <TData,>({
  data,
  columns,
  isLoading,
  isError,
  orderBy,
  reactQueryKEY,
  FilterComponent,
}: TableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para la búsqueda global
  // const [rowSelection, setRowSelection] = useState({}); // Estado para la selección de filas
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      // rowSelection,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    // onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: [{ id: orderBy, desc: false }],
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      {/* Controles de la tabla (búsqueda, filtros, información) */}
      <TableControls
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        filteredRowCount={table.getRowModel().rows.length}
        totalRowCount={table.getFilteredRowModel().rows.length}
        filterComponent={<FilterComponent onFilterChange={setColumnFilters} />}
        reactQueryKEY={reactQueryKEY}
      />

      {/* Tabla */}
      <div className="">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={"hover:bg-gray-100 hover:dark:bg-zinc-800"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-4 text-sm black:text-gray-300 break-words"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div>
        <TablePagination table={table} />
      </div>
    </div>
  );
};
