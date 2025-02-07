import { Shortcuts } from "./shortcuts";
import ItemList from "./itemsAlertList";

const WelcomePage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-2 font-sans">QuimiLab</h1>
        <Shortcuts /> {/*  Aqui se cargan los accesos directos*/}
        <ItemList />        {/*  Aqui se cargan las alertas del inventario*/}

      </div>
    </div>
  );
};
export default WelcomePage;
