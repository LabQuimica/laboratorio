import { UsersTable } from "./tableUser";

const UsersPage = () => {   // Aqui se cargan los componentes de la tabla de usuarios desde los demas archivos
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-2 font-sans">Usuarios registrados en el sistema</h1>
      </div>
      <UsersTable />
    </div>
  );
};
export default UsersPage;
