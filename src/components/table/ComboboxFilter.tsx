"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnFiltersState } from "@tanstack/react-table";

interface ComboboxFilterProps {
  label: string;
  placeholder: string;
  filterId: string;
  items: string[];
  filters: ColumnFiltersState;
  onFilterChange: (filters: ColumnFiltersState) => void;
}

const ComboboxFilter = ({
  label,
  placeholder,
  filterId,
  items,
  filters,
  onFilterChange,
}: ComboboxFilterProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);

    const updatedFilters = filters.filter((filter) => filter.id !== filterId);
    if (newValue !== "") {
      updatedFilters.push({ id: filterId, value: newValue });
    }
    onFilterChange(updatedFilters);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="truncate flex-1 text-left">
            {value || `${label}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <ScrollArea className="h-[200px]">
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={handleSelect}
                    className="flex items-start gap-2 py-2"
                  >
                    <div className="flex-1 break-words whitespace-normal">
                      {item}
                    </div>
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0 mt-1",
                        value === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxFilter;
