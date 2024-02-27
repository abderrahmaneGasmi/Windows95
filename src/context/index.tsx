import React from "react";
import NotepadProvider from "./Notepad";
import TabsProvider from "./Tabs";
import ErrorPopupProvider from "./errorPopup";
interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      {" "}
      <TabsProvider>
        <ErrorPopupProvider>
          <NotepadProvider>{children}</NotepadProvider>
        </ErrorPopupProvider>{" "}
      </TabsProvider>
    </>
  );
}
