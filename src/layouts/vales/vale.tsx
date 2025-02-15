import { ValesTable } from "./tableVale";
import { UpdateVale } from "./UpdateVale";

const ValesPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-2 font-sans">Listado de Vales</h1>
        <UpdateVale />
      </div>
      <ValesTable />
    </div>
  );
};
export default ValesPage;
