import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
interface TablePaginationProps<TData> {
  table: Table<TData>;
}

const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  const getPageNumbers = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    // Si hay menos de 7 páginas, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let pages = [];

    // Siempre mostrar primera página
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Páginas centrales
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Última página
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <p className="text-sm font-medium">Filas por página</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 40].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        {/* Botón para página anterior */}
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none group"
        >
          <IconChevronLeft className="h-4 w-4 text-gray-400 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />
        </button>

        {/* Paginación */}
        <div className="flex items-center">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof page === "number") {
                  table.setPageIndex(page - 1);
                }
              }}
              disabled={typeof page !== "number"}
              className={`
          px-3 py-1 mx-0.5 rounded-md text-sm
          ${
            typeof page === "number"
              ? table.getState().pagination.pageIndex === page - 1
                ? "bg-primary text-primary-foreground"
                : "hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
              : "pointer-events-none"
          }
        `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón para página siguiente */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none group"
        >
          <IconChevronRight className="h-4 w-4 text-gray-400 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
