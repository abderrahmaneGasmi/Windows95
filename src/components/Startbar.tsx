import React, { useEffect, useState } from "react";
import "../styles/components/start.scss";
import RangeInput from "../assets/RangeInput";
export default function Startbar() {
  const [tabs, setTabs] = useState<Array<string>>([
    "File Explorer",
    "Microsoft Edge",
    "Windows Media Player",
  ]);
  const [showSoundControlls, setShowSoundControlls] = useState(false);
  useEffect(() => {
    const handleclickoutside = (e: MouseEvent) => {
      // close sound popup
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
    };
    window.addEventListener("click", handleclickoutside);
    return () => {
      window.removeEventListener("click", handleclickoutside);
    };
  }, []);
  return (
    <div className="startbar">
      <div className="startbar__start">
        <div className="startbar__start__logo">
          <img src="/start.png" alt="windows logo" />
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
        2:00 PM
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
    </div>
  );
}
