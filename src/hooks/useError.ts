import { useContext } from "react";
import { ErrorPopupContext } from "../context/errorPopup";

export const useErrorPopup = () => {
  const context = useContext(ErrorPopupContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
