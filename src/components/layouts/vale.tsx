import { ValesTable } from "./vales/tableVale";

const ValesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Vales</h1>
      <ValesTable />
    </div>
  );
};
export default ValesPage;
