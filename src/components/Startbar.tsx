import React, { useState } from "react";
import "../styles/components/start.scss";
export default function Startbar() {
  const [tabs, setTabs] = useState<Array<string>>([
    "File Explorer",
    "Microsoft Edge",
    "Windows Media Player",
  ]);
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
      <div className="startbar__time">2:00 PM</div>
    </div>
  );
}
