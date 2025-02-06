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
<<<<<<< HEAD
        <p>{formattedDate}, &nbsp;</p>
        <p className="bg-sky-800 black:bg-gray-200 h-7 w-14 rounded-md flex items-center justify-center">
          {formattedTime}
        </p>
=======
        <p className="h-7 w-24 rounded-md flex justify-center items-center text-center">
          {formattedDate}
        </p>
        <p className="ml-2">{formattedTime}</p>
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b
      </div>
    );
  };
};

<<<<<<< HEAD
export default formatDateCell;
=======
export default formatDateCell;
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b
