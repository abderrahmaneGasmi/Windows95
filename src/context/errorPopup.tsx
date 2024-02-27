import React, { useEffect, useState } from "react";
import "../styles/context/errorpopup.scss";
import { TabsContextType } from "./Tabs";
import { useTabs } from "../hooks/useTabs";

interface childrenType {
  children: React.ReactNode;
}
export interface ErrorPopupContextType {
  showError: (message: string, type: string) => void;
}

export const ErrorPopupContext = React.createContext<ErrorPopupContextType>(
  null!
);
export default function ErrorPopupProvider({ children }: childrenType) {
  const { removetabs }: TabsContextType = useTabs();

  const [showerror, setshowerror] = useState({
    show: false,
    message: "",
    type: "",
  });
  const showError = (message: string, type: string) => {
    setshowerror({ show: true, message, type });
  };
  return (
    <ErrorPopupContext.Provider
      value={{
        showError,
      }}
    >
      {showerror.show && (
        <div className="errorpopup">
          <div className="errorpopup__header">
            <div className="errorpopup__header__title">Error</div>
            <div
              className="errorpopup__header__close"
              onClick={() => {
                setshowerror({ show: false, message: "", type: "" });
                removetabs(showerror.type);
              }}
            >
              X
            </div>
          </div>
          <div className="errorpopup__body">
            <div className="errorpopup__body__image">
              <img src="/error.png" alt="error" />
            </div>
            <div className="errorpopup__body__message">{showerror.message}</div>
          </div>
        </div>
      )}
      {children}
    </ErrorPopupContext.Provider>
  );
}
