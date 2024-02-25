import React, { useEffect, useState } from "react";
import "../styles/components/start.scss";
import RangeInput from "../assets/RangeInput";
import RightClickDropDown, {
  RightClickDropDownItem,
  RightClickDropDownSeparator,
} from "../assets/RightClickDropDown";
import { useNotPad } from "../hooks/useNotePad";
import { NotepadContextType } from "../context/Notepad";
export default function Startbar() {
  const [tabs, setTabs] = useState<Array<string>>([
    "File Explorer",
    "Microsoft Edge",
    "Windows Media Player",
  ]);
  const [time, settime] = useState(
    new Date().toLocaleTimeString().split(" ")[0]
  );
  const [showSoundControlls, setShowSoundControlls] = useState(false);
  const [showStartPopup, setShowStartPopup] = useState(false);
  const [showDropDownRightClick, setShowDropDownRightClick] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const { toggleNotepad }: NotepadContextType = useNotPad();

  const startbarref = React.createRef<HTMLDivElement>();
  useEffect(() => {
    const handleclickoutside = (e: MouseEvent) => {
      // close sound popup
      if (!(e.target as HTMLElement).closest(".startbar")) {
        setShowDropDownRightClick({
          show: false,
          x: 0,
          y: 0,
        });
      }
      if (
        (e.target as HTMLElement).className.startsWith(
          "startbar__time__popup"
        ) &&
        !(e.target as HTMLElement).className.startsWith(
          "startbar__time__sound"
        ) &&
        (e.target as HTMLElement).className.startsWith("rangecontainer")
      ) {
        setShowStartPopup(false);
      }
      if (
        !(e.target as HTMLElement).className.startsWith(
          "startbar__time__popup"
        ) &&
        !(e.target as HTMLElement).className.startsWith(
          "startbar__time__sound"
        ) &&
        !(e.target as HTMLElement).className.startsWith("rangecontainer")
      ) {
        setShowSoundControlls(false);
      }
      if (
        !(e.target as HTMLElement).className.startsWith("startbar__start") &&
        !(e.target as HTMLElement).className.startsWith("startbar__popup")
      ) {
        setShowStartPopup(false);
      }
      if (
        (e.target as HTMLElement).className.startsWith("startbar__start") &&
        (e.target as HTMLElement).className.startsWith("startbar__popup")
      ) {
        setShowSoundControlls(false);
      }
    };
    const rightclickhandle = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).className.startsWith("startbar")) {
        document.body.click();
        event.preventDefault();
        return;
      }
      // check if target class start with rightclickdropdown than return
      if (
        (event.target as HTMLElement).className.startsWith("rightclickdropdown")
      ) {
        event.preventDefault();
        // trigger a click event on target
        (event.target as HTMLElement).click();
        return;
      }

      event.preventDefault();
      // get the mouse position and set the dropdown to that position based on the .icon element position

      let x = event.clientX;
      let y = -20;
      const rect = startbarref.current?.getBoundingClientRect();
      const left = rect?.left;
      const top = rect?.top;
      if (left && top) {
        x = x - left - 5;
        y = top;
      }

      setShowDropDownRightClick({
        show: true,
        x,
        y,
      });
    };
    if (startbarref.current)
      startbarref.current.addEventListener("contextmenu", rightclickhandle);
    window.addEventListener("click", handleclickoutside);

    const interval = setInterval(() => {
      settime(new Date().toLocaleTimeString().split(" ")[0]);
    }, 1000);

    return () => {
      if (startbarref.current)
        startbarref.current.removeEventListener(
          "contextmenu",
          rightclickhandle
        );
      window.removeEventListener("click", handleclickoutside);
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="startbar" ref={startbarref}>
      <div
        className="startbar__start clickablelink"
        onClick={() => {
          setShowStartPopup(!showStartPopup);
        }}
      >
        <div className="startbar__start__logo">
          <img
            src="/start.png"
            alt="windows logo"
            className="startbar__start__logo__image"
          />
        </div>
        <div className="startbar__start__text">Start</div>
      </div>
      <div className="startbar__tabs">
        {tabs.map((tab, index) => (
          <div key={index} className="startbar__tabs__tab">
            {tab}
          </div>
        ))}
      </div>
      <div className="startbar__time">
        <div
          className="startbar__time__sound"
          onClick={() => {
            setShowSoundControlls(!showSoundControlls);
          }}
        >
          <img
            src="/sound.png"
            alt="sound"
            className="startbar__time__sound__icon"
          />
        </div>{" "}
        {time}
        {showSoundControlls && (
          <div className="startbar__time__popup">
            <div className="startbar__time__popup__title">Volume</div>
            {/* <div className="startbar__time__popup__slider">
            <input type="range" min="0" max="100" />
          </div> */}
            <RangeInput />
            <div className="startbar__time__popup__input">
              <input
                type="checkbox"
                name="mute"
                id="mute"
                className="startbar__time__popup__input__checkbox"
              />
              <label
                htmlFor="mute"
                className="startbar__time__popup__input__label"
              >
                Mute
              </label>
            </div>
          </div>
        )}
      </div>
      {showStartPopup && (
        <div className="startbar__popup">
          <div className="startbar__popup__left">
            <div className="startbar__popup__left__text">
              <b className="startbar__popup__left__text__b">Windows</b> 95
            </div>
          </div>
          <div className="startbar__popup__right">
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/update.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">
                Windows update
              </div>
            </div>
            <div className="startbar__popup__right__item">
              <div className="startbar__popup__right__item__image">
                <img src="/explorer.png" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">
                Internet Explorer
              </div>
            </div>
            <div className="startbar__popup__right__separator"></div>
            <div className="startbar__popup__right__item">
              <div className="startbar__popup__right__item__image">
                <img src="/programs.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">Programs</div>
              <div style={{ flexGrow: 2 }}></div>
              <div className="startbar__popup__right__item__expend">▸</div>
              <div className="startbar__popup__right__item__extra">
                <div className="startbar__popup__right__item__extra__item disabled">
                  <div className="startbar__popup__right__item__extra__item__image">
                    <img src="/word.ico" alt="update" />
                  </div>
                  <div className="startbar__popup__right__item__extra__item__text">
                    Microsoft Word
                  </div>
                </div>
                <div
                  className="startbar__popup__right__item__extra__item"
                  onClick={() => {
                    toggleNotepad(true);
                    setShowStartPopup(false);
                  }}
                >
                  <div className="startbar__popup__right__item__extra__item__image">
                    <img src="/notepad.ico" alt="update" />
                  </div>
                  <div className="startbar__popup__right__item__extra__item__text">
                    Notepad
                  </div>
                </div>
                <div className="startbar__popup__right__item__extra__item disabled">
                  <div className="startbar__popup__right__item__extra__item__image">
                    <img src="/defragment.png" alt="update" />
                  </div>
                  <div className="startbar__popup__right__item__extra__item__text">
                    Disk Defragmenter
                  </div>
                </div>
                <div className="startbar__popup__right__item__extra__item disabled">
                  <div className="startbar__popup__right__item__extra__item__image">
                    <img src="/solitaire.png" alt="update" />
                  </div>
                  <div className="startbar__popup__right__item__extra__item__text">
                    Solitaire
                  </div>
                </div>
                <div className="startbar__popup__right__item__extra__item disabled">
                  <div className="startbar__popup__right__item__extra__item__image">
                    <img src="/mines.png" alt="update" />
                  </div>
                  <div className="startbar__popup__right__item__extra__item__text">
                    Minesweeper
                  </div>
                </div>
              </div>
            </div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/favorites.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">
                Favorites
              </div>
              <div style={{ flexGrow: 2 }}></div>
              <div className="startbar__popup__right__item__expend">▸</div>
            </div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/documents.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">
                Documents
              </div>
              <div style={{ flexGrow: 2 }}></div>
              <div className="startbar__popup__right__item__expend">▸</div>
            </div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/settings.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">Settings</div>
              <div style={{ flexGrow: 2 }}></div>
              <div className="startbar__popup__right__item__expend">▸</div>
            </div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/find.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">Find</div>
              <div style={{ flexGrow: 2 }}></div>
              <div className="startbar__popup__right__item__expend">▸</div>
            </div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/help.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">Help</div>
              <div style={{ flexGrow: 2 }}></div>
            </div>
            <div className="startbar__popup__right__separator"></div>
            <div className="startbar__popup__right__item disabled">
              <div className="startbar__popup__right__item__image">
                <img src="/shut_down.ico" alt="update" />
              </div>
              <div className="startbar__popup__right__item__text">
                Shutdown...
              </div>
              <div style={{ flexGrow: 2 }}></div>
            </div>
          </div>
        </div>
      )}
      {showDropDownRightClick.show && (
        <RightClickDropDown
          top={showDropDownRightClick.y}
          left={showDropDownRightClick.x}
        >
          <RightClickDropDownItem onClick={() => alert("Open")} disabled={true}>
            Open
          </RightClickDropDownItem>
          <RightClickDropDownItem
            onClick={() => alert("Explore")}
            disabled={true}
          >
            Explore
          </RightClickDropDownItem>

          <RightClickDropDownSeparator />
          <RightClickDropDownItem
            onClick={() => alert("Short")}
            disabled={true}
          >
            Create Shortcut
          </RightClickDropDownItem>
          <RightClickDropDownItem
            onClick={() => alert("Rename")}
            disabled={true}
          >
            Rename
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Cut")} disabled={true}>
            Cut
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Copy")} disabled={true}>
            Copy
          </RightClickDropDownItem>
          <RightClickDropDownItem
            onClick={() => alert("Delete")}
            disabled={true}
          >
            Delete
          </RightClickDropDownItem>
          <RightClickDropDownSeparator />
          <RightClickDropDownItem onClick={() => alert("Delete")}>
            Properties
          </RightClickDropDownItem>
        </RightClickDropDown>
      )}
    </div>
  );
}
