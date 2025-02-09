"use client";
import React from 'react';
import { TabsProps } from '@/types/tabsTypes';

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
}) => {
  return (
    <div className={"flex flex-row"}>
      {tabs.map((tab) => (
        <div key={tab.id} className="h-10 mr-5">
          <button
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-row px-4 py-2 rounded-t-xl transition-colors items-center h-full ${
              activeTab === tab.id
                ? 'bg-bg-active-light text-black dark:bg-bg-active-dark dark:text-white'
                : 'bg-bg-disable-light text-text-disable-light dark:bg-bg-disable-dark dark:text-text-disable-dark'
            }`}
          >
            {tab.icon && (
              <div className={`h-5 w-5 flex-shrink-0 mr-2 ${
                activeTab === tab.id 
                  ? 'text-black dark:text-white' 
                  : 'text-text-disable-light dark:text-text-disable-dark'
              }`}>
                {tab.icon}
              </div>
            )}
            <p className="text-sm">{tab.label}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tabs;