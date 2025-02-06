import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TruncatedCell = ({ text }: any) => {
  if (!text) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {text}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] break-words">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

<<<<<<< HEAD
export default TruncatedCell;
=======
export default TruncatedCell;
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b
