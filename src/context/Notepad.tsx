import React, { useEffect, useState } from "react";
import "../styles/context/notepad.scss";
import RightClickDropDown, {
  RightClickDropDownSeparator,
  RightClickDropDownItem,
} from "../assets/RightClickDropDown";
import { TabsContextType } from "./Tabs";
import { useTabs } from "../hooks/useTabs";
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
  const { removetabs }: TabsContextType = useTabs();

  const toggleNotepad = (value: boolean) => {
    if (classanim === "maximize" || classanim === "minimize") {
      return;
    }

    if (value) {
      setClassanim("bounce-in-up");
      setShownotepad(value);
    } else {
      if (classanim === "maximizestyles")
        setClassanim("bounce-out-down-maximize");
      else setClassanim("bounce-out-down");
      setTimeout(() => {
        setShownotepad(value);
      }, 700);
    }
  };
  const [showdropdown, setShowdropdown] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const maximizeNotepad = () => {
    if (classanim === "maximize") {
      return;
    }
    if (classanim !== "maximizestyles") {
      setClassanim("maximize");
      setTimeout(() => {
        setClassanim("maximizestyles");
      }, 650);
    } else {
      setClassanim("minimize");
      setTimeout(() => {
        setClassanim("");
      }, 650);
    }
  };
  const refr = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if (refr.current) {
      refr.current.addEventListener("contextmenu", (event) => {
        // check if target class start with rightclickdropdown than return
        if (
          (event.target as HTMLElement).className.startsWith(
            "rightclickdropdown"
          )
        ) {
          event.preventDefault();
          // trigger a click event on target
          (event.target as HTMLElement).click();
          return;
        }

        event.preventDefault();
        // get the mouse position and set the dropdown to that position based on the .icon element position

        let x = event.clientX;
        let y = event.clientY;

        const rect = refr.current?.getBoundingClientRect();
        if (!rect) return;
        const left = rect?.left;
        const top = rect?.top;
        if (left && top) {
          x = x - left - 7;
          y = y - top - 10;
        }

        setShowdropdown({
          show: true,
          x,
          y,
        });
      });
    }
    const handleclickoutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".icon")) {
        setShowdropdown({ show: false, x: 0, y: 0 });
      }
    };

    window.addEventListener("click", handleclickoutside);

    return () => {
      if (refr.current) {
        refr.current.removeEventListener("contextmenu", (event) => {
          event.preventDefault();
        });
      }
      window.removeEventListener("click", handleclickoutside);
    };
  }, [refr]);

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
              <div
                className="notepad__header__right__icon"
                onClick={() => {
                  maximizeNotepad();
                }}
              >
                <img src="/maximise.png" alt="maximize" />
              </div>
              <div
                className="notepad__header__right__icon"
                onClick={() => {
                  toggleNotepad(false);
                  removetabs("Notepad - Untitled");
                }}
              >
                <img src="/close.png" alt="close" />
              </div>
            </div>
          </div>
          <div className="notepad__nav">
            <div className="notepad__nav__item">
              File{" "}
              <div className="notepad__nav__item__extra">
                <div className="notepad__nav__item__extra__item disabled">
                  New
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Open
                </div>
                <div className="notepad__nav__item__extra__separator disabled"></div>
                <div className="notepad__nav__item__extra__item disabled">
                  Save
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Save As
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Page Setup
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Print
                </div>
                <div
                  className="notepad__nav__item__extra__item"
                  onClick={() => {
                    toggleNotepad(false);
                  }}
                >
                  Exit
                </div>
              </div>
            </div>
            <div className="notepad__nav__item">
              Edit
              <div className="notepad__nav__item__extra">
                <div className="notepad__nav__item__extra__item disabled">
                  Undo
                </div>
                <div className="notepad__nav__item__extra__separator disabled"></div>
                <div className="notepad__nav__item__extra__item disabled">
                  Cut
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Copy
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Paste
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Delete
                </div>
                <div className="notepad__nav__item__extra__separator disabled"></div>
                <div className="notepad__nav__item__extra__item disabled">
                  Find
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Find Next
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Replace
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Go To
                </div>
                <div className="notepad__nav__item__extra__separator disabled"></div>
                <div className="notepad__nav__item__extra__item disabled">
                  Select All
                </div>
                <div className="notepad__nav__item__extra__item disabled">
                  Time/Date
                </div>
              </div>
            </div>
            <div className="notepad__nav__item">
              Help
              <div className="notepad__nav__item__extra">
                <div className="notepad__nav__item__extra__item disabled">
                  View Help
                </div>
                <div className="notepad__nav__item__extra__separator disabled"></div>
                <div className="notepad__nav__item__extra__item disabled">
                  About Notepad
                </div>
              </div>
            </div>
          </div>
          <div
            ref={refr}
            className="notepad__body"
            style={
              classanim === "maximizestyles" ||
              classanim === "maximize" ||
              classanim === "minimize" ||
              classanim === "bounce-out-down-maximize"
                ? { height: "100%" }
                : {}
            }
          >
            <textarea
              className="notepad__body__textarea"
              cols={90}
              rows={30}
              style={
                classanim === "maximizestyles" ||
                classanim === "maximize" ||
                classanim === "minimize" ||
                classanim === "bounce-out-down-maximize"
                  ? { width: "100%", height: "100%", resize: "none" }
                  : {}
              }
            ></textarea>
            {showdropdown.show && (
              <RightClickDropDown
                direction="top"
                top={showdropdown.y}
                left={showdropdown.x}
              >
                <RightClickDropDownItem onClick={() => alert("Undo")}>
                  Undo
                </RightClickDropDownItem>

                <RightClickDropDownSeparator />
                <RightClickDropDownItem onClick={() => alert("Cut")}>
                  Cut
                </RightClickDropDownItem>
                <RightClickDropDownItem onClick={() => alert("Copy")}>
                  Copy
                </RightClickDropDownItem>
                <RightClickDropDownItem onClick={() => alert("Select All")}>
                  Select All
                </RightClickDropDownItem>
                <RightClickDropDownSeparator />
                <RightClickDropDownItem onClick={() => alert("Delete")}>
                  Properties
                </RightClickDropDownItem>
              </RightClickDropDown>
            )}
          </div>
        </div>
      )}

      {children}
    </NotepadContext.Provider>
  );
}
