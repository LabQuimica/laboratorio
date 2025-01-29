import { UsersTable } from "./tableUsers";

const UsersPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Usuarios</h1>
      <UsersTable />
    </div>
  );
};
export default UsersPage;