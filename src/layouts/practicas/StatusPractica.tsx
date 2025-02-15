import React from "react";

const StatusPractica = ({ value }: { value: number }) => {
  return (
    <div className="flex justify-center w-full">
      <span
        className={`px-2 py-1 rounded-full text-sm w-24 items-center justify-center text-center ${
          value === 1 ? "bg-btn-assigned text-black" : "bg-btn-not-assigned text-black"
        }`}
      >
        {value === 1 ? "Asignada" : "No asignada"}
      </span>
    </div>
  );
};

export default StatusPractica;
