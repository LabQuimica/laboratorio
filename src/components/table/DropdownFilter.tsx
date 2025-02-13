"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnFiltersState } from "@tanstack/react-table";

interface DropdownFilterProps {
  label: string;
  filterId: string;
  options: { label: string; value: string }[];
  filters: ColumnFiltersState;
  onFilterChange: (filters: ColumnFiltersState) => void;
}

const DropdownFilter = ({
  label,
  filterId,
  options,
  filters,
  onFilterChange,
}: DropdownFilterProps) => {
  const isFilterActive = (value: string) =>
    filters.some((filter) => filter.id === filterId && filter.value === value);

  const handleFilterChange = (value: string) => {
    const updatedFilters = filters.filter((filter) => filter.id !== filterId);
    if (value !== "") {
      updatedFilters.push({ id: filterId, value });
    }
    onFilterChange(updatedFilters);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            className={
              isFilterActive(option.value) ? "bg-gray-100 text-black" : ""
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
