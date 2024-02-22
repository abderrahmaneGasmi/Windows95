import React, { useEffect, useState } from "react";
import "./App.css";
import Startbar from "./components/Startbar";
import Icons from "./components/Icons";
import RightClickDropDown, {
  RightClickDropDownItem,
  RightClickDropDownSeparator,
} from "./assets/RightClickDropDown";

function App() {
  const [showDropDownRightClick, setShowDropDownRightClick] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const container = document.getElementById("container");

    const rightclickhandle = (event: MouseEvent) => {
      // check if target class start with rightclickdropdown than return

      if ((event.target as HTMLElement).className.startsWith("icon")) {
        setShowDropDownRightClick({ show: false, x: 0, y: 0 });
        return;
      }
      container?.click();
      if (
        (event.target as HTMLElement).className.startsWith("rightclickdropdown")
      ) {
        event.preventDefault();
        // trigger a click event on target
        (event.target as HTMLElement).click();
        return;
      }
      event.preventDefault();
      if (event.target !== container) {
        console.log(event.target, container);
        return;
      }

      // get the mouse position and set the dropdown to that position based on the .icon element position

      setShowDropDownRightClick({
        show: true,
        x: event.clientX,
        y: event.clientY - 473,
      });
    };
    const handleclickoutside = (e: MouseEvent) => {
      setShowDropDownRightClick({ show: false, x: 0, y: 0 });
    };

    if (container) container.addEventListener("contextmenu", rightclickhandle);
    window.addEventListener("click", handleclickoutside);
    return () => {
      window.removeEventListener("click", handleclickoutside);
      if (container)
        container.removeEventListener("contextmenu", rightclickhandle);
    };
  }, []);

  return (
    <>
      <div className="main">
        <div className="container" id="container">
          <Icons />
        </div>
        <Startbar />
        {showDropDownRightClick.show && (
          <RightClickDropDown
            top={showDropDownRightClick.y}
            left={showDropDownRightClick.x}
          >
            <RightClickDropDownItem
              onClick={() => alert("Open")}
              disabled={true}
            >
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
            <RightClickDropDownItem
              onClick={() => alert("Cut")}
              disabled={true}
            >
              Cut
            </RightClickDropDownItem>
            <RightClickDropDownItem
              onClick={() => alert("Copy")}
              disabled={true}
            >
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
    </>
  );
}

export default App;
