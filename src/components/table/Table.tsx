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
  VisibilityState,
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
  hiddenColumns?: string[];
}

export const Table = <TData,>({
  data,
  columns,
  isLoading,
  isError,
  orderBy,
  reactQueryKEY,
  FilterComponent,
  hiddenColumns = [],
}: TableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para la búsqueda global
  // const [rowSelection, setRowSelection] = useState({}); // Estado para la selección de filas
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const initialColumnVisibility: VisibilityState = {};
  hiddenColumns.forEach(columnId => {
    initialColumnVisibility[columnId] = false;
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility: {
        id_vale: false,
        id_pa: false,
      },
      // rowSelection,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    // onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
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
    <div className="py-3">
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
