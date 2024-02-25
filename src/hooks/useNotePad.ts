import { useContext } from "react";
import { NotepadContext } from "../context/Notepad";

export const useNotPad = () => {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
