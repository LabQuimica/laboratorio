"use client";
import { IconRosetteDiscountCheckFilled, IconClockCheck } from "@tabler/icons-react";

interface TabsProps {
  viewType: 'creadas' | 'asignadas';
  setViewType: (type: 'creadas' | 'asignadas') => void;
}

const Tabs: React.FC<TabsProps> = ({ viewType, setViewType }) => {
  return (
    <div className="flex flex-row">
      
      {/* Botón de pestaña para ver las prácticas creadas */}
      <div className="h-10 mr-5">
        <button
          onClick={() => setViewType('creadas')}
          className={`flex flex-row px-4 py-2 rounded-t-xl transition-colors items-center h-full ${
            viewType === 'creadas'
              ? 'bg-bg-active-light text-black dark:bg-bg-active-dark dark:text-white'
              : 'bg-bg-disable-light text-text-disable-light dark:bg-bg-disable-dark dark:text-text-disable-dark'
          }`}
        >
          <IconClockCheck className={`h-5 w-5 flex-shrink-0 mr-2 ${viewType === 'creadas' ? 'text-black dark:text-white' : 'text-text-disable-light dark:text-text-disable-dark'}`} />
          <p className="text-sm">Creadas</p>
        </button>
      </div>

      {/* Botón de pestaña para ver las prácticas asignadas */}
      <div className="h-10 mr-5">
        <button
          onClick={() => setViewType('asignadas')}
          className={`flex flex-row px-4 py-2 rounded-t-xl transition-colors items-center h-full ${
            viewType === 'asignadas'
              ? 'bg-bg-active-light text-black dark:bg-bg-active-dark dark:text-white'
              : 'bg-bg-disable-light text-text-disable-light dark:bg-bg-disable-dark dark:text-text-disable-dark'
          }`}
        >
          <IconRosetteDiscountCheckFilled className={`h-5 w-5 flex-shrink-0 mr-2 ${viewType === 'asignadas' ? 'text-black dark:text-white' : 'text-text-disable-light dark:text-text-disable-dark'}`} />
          <p className="text-sm">Asignadas</p>
        </button>
      </div>
      
    </div>
  );
};

export default Tabs;
