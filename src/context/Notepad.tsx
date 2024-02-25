import React, { useState } from "react";
import "../styles/context/notepad.scss";
interface childrenType {
  children: React.ReactNode;
}
export interface NotepadContextType {
  shownotepad: boolean;
  toggleNotepad: (value: boolean) => void;
}

export const NotepadContext = React.createContext<NotepadContextType>(null!);
export default function NotepadProvider({ children }: childrenType) {
  const [shownotepad, setShownotepad] = useState(false);
  const [classanim, setClassanim] = useState("bounce-in-up");
  const toggleNotepad = (value: boolean) => {
    if (value) {
      setClassanim("bounce-in-up");
      setShownotepad(value);
    } else {
      setClassanim("bounce-out-down");
      setTimeout(() => {
        setShownotepad(value);
      }, 700);
    }
  };

  return (
    <NotepadContext.Provider
      value={{
        shownotepad,
        toggleNotepad,
      }}
    >
      {shownotepad && (
        <div className={`notepad ${classanim}`}>
          <div className="notepad__header">
            <div className="notepad__header__left">
              <div className="notepad__header__left__icon">
                <img src="/notepad.ico" alt="notepad" />
              </div>
              <div className="notepad__header__left__title">
                Untitled - Notepad
              </div>
            </div>
            <div className="notepad__header__right">
              <div
                className="notepad__header__right__icon"
                onClick={() => {
                  toggleNotepad(false);
                }}
              >
                <img src="/minus.png" alt="minimize" />
              </div>
              <div className="notepad__header__right__icon">
                <img src="/maximise.png" alt="maximize" />
              </div>
              <div
                className="notepad__header__right__icon"
                onClick={() => {
                  toggleNotepad(false);
                }}
              >
                <img src="/close.png" alt="close" />
              </div>
            </div>
          </div>
          <div className="notepad__nav">
            <div className="notepad__nav__item">File</div>
            <div className="notepad__nav__item">Edit</div>
            <div className="notepad__nav__item">Search</div>
          </div>
          <div className="notepad__body">
            <textarea
              className="notepad__body__textarea"
              cols={90}
              rows={30}
            ></textarea>
          </div>
        </div>
      )}

      {children}
    </NotepadContext.Provider>
  );
}
