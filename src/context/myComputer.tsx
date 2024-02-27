import React, { useState } from "react";
import "../styles/context/mycomputer.scss";
import { TabsContextType } from "./Tabs";
import { useTabs } from "../hooks/useTabs";
import { motion } from "framer-motion";
import { ErrorPopupContextType } from "./errorPopup";
import { useErrorPopup } from "../hooks/useError";
interface childrenType {
  children: React.ReactNode;
}
export interface MyComputerContextType {
  toggleshow: (value: boolean) => void;
}

export const MyComputerContext = React.createContext<MyComputerContextType>(
  null!
);
export default function MyComputerProvider({ children }: childrenType) {
  const [show, setshow] = useState(true);
  const { removetabs, addtabs }: TabsContextType = useTabs();
  const { showError }: ErrorPopupContextType = useErrorPopup();
  const [slectedtab, setSlectedtab] = useState("");
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
  const toggleshow = (value: boolean) => {
    setshow(value);
  };
  const togglemaximise = () => {
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
  return (
    <MyComputerContext.Provider value={{ toggleshow }}>
      {show && (
        <motion.div
          className="mycomputer"
          style={{}}
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
          transition={{ duration: 0.5 }}
        >
          <div className="mycomputer__header">
            <div className="mycomputer__header__left">
              <div className="mycomputer__header__left__icon">
                <img src="/pc.png" alt="mycomputer" />
              </div>
              <div className="mycomputer__header__left__title">
                My Computer - C:/
              </div>
            </div>
            <div className="mycomputer__header__right">
              <div
                className="mycomputer__header__right__icon"
                onClick={() => {
                  toggleshow(false);
                }}
              >
                <img src="/minus.png" alt="minimize" />
              </div>
              <div
                className="mycomputer__header__right__icon"
                onClick={() => {
                  // maximizeMycomputer();
                  togglemaximise();
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
                className="mycomputer__header__right__icon"
                onClick={() => {
                  toggleshow(false);
                  removetabs(`My Computer - C:/`);
                }}
              >
                <img src="/close.png" alt="close" />
              </div>
            </div>
          </div>
          <div className="mycomputer__nav">
            <div className="mycomputer__nav__item">
              File{" "}
              <div className="mycomputer__nav__item__extra">
                <div className="mycomputer__nav__item__extra__item disabled">
                  New
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Open
                </div>
                <div className="mycomputer__nav__item__extra__separator disabled"></div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Save
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Save As
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Page Setup
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Print
                </div>
                <div
                  className="mycomputer__nav__item__extra__item"
                  onClick={() => {
                    toggleshow(false);
                    removetabs(`My Computer - C:/`);
                  }}
                >
                  Exit
                </div>
              </div>
            </div>
            <div className="mycomputer__nav__item">
              Edit
              <div className="mycomputer__nav__item__extra">
                <div className="mycomputer__nav__item__extra__item disabled">
                  Undo
                </div>
                <div className="mycomputer__nav__item__extra__separator disabled"></div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Cut
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Copy
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Paste
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Delete
                </div>
                <div className="mycomputer__nav__item__extra__separator disabled"></div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Find
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Find Next
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Replace
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Go To
                </div>
                <div className="mycomputer__nav__item__extra__separator disabled"></div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Select All
                </div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  Time/Date
                </div>
              </div>
            </div>
            <div className="mycomputer__nav__item">
              Help
              <div className="mycomputer__nav__item__extra">
                <div className="mycomputer__nav__item__extra__item disabled">
                  View Help
                </div>
                <div className="mycomputer__nav__item__extra__separator disabled"></div>
                <div className="mycomputer__nav__item__extra__item disabled">
                  About Mycomputer
                </div>
              </div>
            </div>
          </div>
          <div className="mycomputer__navigation">
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "This feature is not available in this version of My Computer.",
                  "Missing Feature"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/left.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Back</div>
            </div>
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "THIS FEATURE IS NOT AVAILABLE IN THIS VERSION OF MY COMPUTER.",
                  "MISSING FEATURE"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/right.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Forward</div>
            </div>
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "THIS FEATURE IS NOT AVAILABLE IN THIS VERSION OF MY COMPUTER.",
                  "MISSING FEATURE"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/up.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Up</div>
            </div>
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "THIS FEATURE IS NOT AVAILABLE IN THIS VERSION OF MY COMPUTER.",
                  "MISSING FEATURE"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/cut.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Cut</div>
            </div>
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "THIS FEATURE IS NOT AVAILABLE IN THIS VERSION OF MY COMPUTER.",
                  "MISSING FEATURE"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/copy.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Copy</div>
            </div>
            <div
              className="mycomputer__navigation__item"
              onClick={() => {
                showError(
                  "THIS FEATURE IS NOT AVAILABLE IN THIS VERSION OF MY COMPUTER.",
                  "MISSING FEATURE"
                );
                addtabs("Missing Feature");
              }}
            >
              <div className="mycomputer__navigation__item__image">
                <img src="/delete.png" alt="folder" />
              </div>
              <div className="mycomputer__navigation__item__text">Delete</div>
            </div>
          </div>
          <div className="mycomputer__bar">
            <div className="mycomputer__bar__text">Address</div>
            <div className="mycomputer__bar__input">
              <div className="mycomputer__bar__input__image">
                <img src="/pc.png" alt="address" />
              </div>
              <div className="mycomputer__bar__input__text">
                My Computer - C:/
              </div>
            </div>{" "}
            <div className="mycomputer__bar__icon">
              <img src="/dropdown.gif" alt="search" />
            </div>
          </div>
          <div
            className="mycomputer__icons"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              // check if the click is outside the icons
              if ((e.target as HTMLElement).className === "mycomputer__icons") {
                setSlectedtab("");
              }
            }}
          >
            <div
              className="mycomputer__icons__icon"
              onClick={() => {
                setSlectedtab("Local Disk (C:)");
              }}
            >
              <div className="mycomputer__icons__icon__image">
                <img src="/diskoptic.png" alt="folder" />
              </div>
              <div
                className="mycomputer__icons__icon__text"
                style={
                  slectedtab === "Local Disk (C:)"
                    ? {
                        backgroundColor: "blue",
                        color: "white",
                      }
                    : {
                        backgroundColor: "transparent",
                      }
                }
              >
                Local Disk (C:)
              </div>
            </div>
            <div
              className="mycomputer__icons__icon"
              onClick={() => {
                setSlectedtab("Local Disk (D:)");
              }}
            >
              <div className="mycomputer__icons__icon__image">
                <img src="/disk.png" alt="folder" />
              </div>
              <div
                className="mycomputer__icons__icon__text"
                style={
                  slectedtab === "Local Disk (D:)"
                    ? {
                        backgroundColor: "blue",
                        color: "white",
                      }
                    : {
                        backgroundColor: "transparent",
                      }
                }
              >
                Local Disk (D:)
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {children}
    </MyComputerContext.Provider>
  );
}
