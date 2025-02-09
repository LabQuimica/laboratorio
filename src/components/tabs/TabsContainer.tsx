"use client";
import React from 'react';
import Tabs from './Tabs';
import { TabsProps } from '@/types/tabsTypes';

const TabsContainer: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className={"bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 p-5"}>
        {activeContent}
      </div>
    </div>
  );
};

export default TabsContainer;