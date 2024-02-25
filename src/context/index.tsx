import React from "react";
import NotepadProvider from "./Notepad";
import TabsProvider from "./Tabs";
interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      <TabsProvider>
        <NotepadProvider>{children}</NotepadProvider>
      </TabsProvider>
    </>
  );
}
