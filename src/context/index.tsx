import React from "react";
import NotepadProvider from "./Notepad";
interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      <NotepadProvider>{children}</NotepadProvider>
    </>
  );
}
