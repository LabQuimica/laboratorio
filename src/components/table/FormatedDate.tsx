import React from "react";

interface CellProps {
  row: {
    getValue: (key: string) => string;
  };
}

const formatDateCell = (key: string) => {
  return ({ row }: CellProps) => {
    const fecha = new Date(row.getValue(key));
    const formattedDate = fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return (
      <div className="flex justify-center items-center">
        <p className="h-7 w-24 rounded-md flex justify-center items-center text-center">
          {formattedDate}
        </p>
        <p className="ml-2">{formattedTime}</p>
      </div>
    );
  };
};

export default formatDateCell;
