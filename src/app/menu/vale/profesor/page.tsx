"use client";
import { useStatusStore } from "@/stores/valesStore";

function Profesor() {
  const { statusChanges, commentChanges } = useStatusStore();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Status Changes</h1>
      <pre className="p-2 rounded">
        {JSON.stringify(statusChanges, null, 2)}
      </pre>

      <h1 className="text-xl font-bold mt-4 mb-2">Comment Changes</h1>
      <pre className="p-2 rounded">
        {JSON.stringify(commentChanges, null, 2)}
      </pre>
    </div>
  );
}

export default Profesor;
