import { useContext } from "react";
import { MyComputerContext } from "../context/myComputer";

export const useMyComputer = () => {
  const context = useContext(MyComputerContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
