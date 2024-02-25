import React, { useState } from "react";
interface childrenType {
  children: React.ReactNode;
}
export interface TabsContextType {
  tabs: Array<string>;
  addtabs: (tab: string) => void;
  removetabs: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextType>(null!);
export default function TabsProvider({ children }: childrenType) {
  const addtabs = (tab: string) => {
    setTabs([...tabs, tab]);
  };
  const removetabs = (tab: string) => {
    setTabs(tabs.filter((t) => t !== tab));
  };
  const [tabs, setTabs] = useState<Array<string>>([]);
  return (
    <TabsContext.Provider
      value={{
        addtabs,
        tabs,
        removetabs,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}
