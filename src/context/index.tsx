import React from "react";
import NotepadProvider from "./Notepad";
import TabsProvider from "./Tabs";
import ErrorPopupProvider from "./errorPopup";
import MyComputerProvider from "./myComputer";
interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      {" "}
      <TabsProvider>
        <ErrorPopupProvider>
          <MyComputerProvider>
            <NotepadProvider>{children}</NotepadProvider>
          </MyComputerProvider>
        </ErrorPopupProvider>{" "}
      </TabsProvider>
    </>
  );
}
