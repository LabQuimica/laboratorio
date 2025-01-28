import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  // Función para generar el array de páginas a mostrar
  const getPageNumbers = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    const delta = 1;

    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || //
        i === totalPages || // Última página
        (i >= currentPage - delta && i <= currentPage + delta) // Páginas cercanas a la actual
      ) {
        range.push(i);
      }
    }

    // Agregar elipsis donde sea necesario
    const withElipsis = [];
    let prev = 0;
    for (const i of range) {
      if (prev + 1 !== i) {
        withElipsis.push("ellipsis");
      }
      withElipsis.push(i);
      prev = i;
    }

    return withElipsis;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
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

      <Pagination className="justify-end ">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={
                !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page} className="cursor-pointer">
                <PaginationLink
                  onClick={() => table.setPageIndex(Number(page) - 1)}
                  isActive={
                    table.getState().pagination.pageIndex === Number(page) - 1
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => table.nextPage()}
              className={
                !table.getCanNextPage() ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
