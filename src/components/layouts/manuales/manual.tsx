import ManualFileList from "./list";

const ManualPage = () => {   // Aqui se cargan los componentes de la tabla de usuarios desde los demas archivos
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-2 font-sans">Manuales disponibles</h1>
      </div>
      <ManualFileList />
    </div>
  );
};
export default ManualPage;
