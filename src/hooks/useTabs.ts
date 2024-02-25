import { useContext } from "react";
import { TabsContext } from "../context/Tabs";

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
