import React, { useEffect, useState } from "react";
import "../styles/context/notepad.scss";
import RightClickDropDown, {
  RightClickDropDownSeparator,
  RightClickDropDownItem,
} from "../assets/RightClickDropDown";
import { TabsContextType } from "./Tabs";
import { useTabs } from "../hooks/useTabs";
import { motion } from "framer-motion";
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
  const [containerstyles, setContainerstyles] = useState({
    width: "70rem",
    height: "40rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    state: "small" as "small" | "maximised",
  });
  const { removetabs }: TabsContextType = useTabs();

  const toggleNotepad = (value: boolean) => {
    setShownotepad(value);
  };
  const [showdropdown, setShowdropdown] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const maximizeNotepad = () => {
    if (containerstyles.state === "small") {
      setContainerstyles({
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        transform: "translate(0%, 0%)",
        right: "auto",
        bottom: "auto",
        state: "maximised",
      });
    } else {
      setContainerstyles({
        width: "70rem",
        height: "40rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        right: "auto",
        bottom: "auto",
        state: "small",
      });
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
        <motion.div
          className={`notepad`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            width: containerstyles.width,
            height: containerstyles.height,
            top: containerstyles.top,
            left: containerstyles.left,
            transform: containerstyles.transform,
            right: containerstyles.right,
            bottom: containerstyles.bottom,
          }}
          transition={{ duration: 0.3 }}
        >
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
                <img
                  src={
                    containerstyles.state !== "small"
                      ? "/minimize.gif"
                      : "/maximise.png"
                  }
                  alt="maximize"
                />
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
          <textarea
            className="notepad__body__textarea"
            style={{
              resize: "none",
              height: "100%",
            }}
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
        </motion.div>
      )}

      {children}
    </NotepadContext.Provider>
  );
}
