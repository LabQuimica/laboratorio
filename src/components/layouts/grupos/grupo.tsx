import { GruposTable } from "./tableGrupos";

const GruposPage = () => {
    return (
        <div className="p-4">
            <div className="flex mb-7 w-full">
                <div className="flex justify-between items-center w-[90%]">
                    <h1 className="text-2xl font-bold mb-2 font-sans">Grupos</h1>
                </div>
            </div>
            <GruposTable />
        </div>
    );
};

export default GruposPage;