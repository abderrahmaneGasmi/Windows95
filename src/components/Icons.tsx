import React, { useEffect, useState } from "react";
import "../styles/components/icons.scss";
import RightClickDropDown, {
  RightClickDropDownItem,
  RightClickDropDownSeparator,
} from "../assets/RightClickDropDown";
const icons = [
  {
    image: "/folder.png",
    name: "Documents",
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    image: "/pc.png",
    name: "This PC",
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    image: "/networks.png",
    name: "Networks",
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    image: "/recycle.png",
    name: "Recycle Bin",
    ref: React.createRef<HTMLDivElement>(),
  },

  {
    image: "/wrong.png",
    name: "program.exe",
    ref: React.createRef<HTMLDivElement>(),
  },
];

export default function Icons() {
  const [selected, setSelected] = useState("");
  const [showdropdown, setShowdropdown] = useState({
    show: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected("");
      }
      if (e.key === "Enter") {
        alert("You pressed Enter!");
      }
      // down arrow
      if (e.key === "ArrowDown") {
        const index = icons.findIndex((icon) => icon.name === selected);
        if (index < icons.length - 1) {
          console.log(icons[index + 1]);
          setSelected(icons[index + 1].name);
        }
      }
      // up arrow
      if (e.key === "ArrowUp") {
        const index = icons.findIndex((icon) => icon.name === selected);
        if (index > 0) {
          setSelected(icons[index - 1].name);
        }
      }
    };
    const handleclickoutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".icon")) {
        setSelected("");
        setShowdropdown({ show: false, x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleclickoutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleclickoutside);
    };
  }, [selected]);

  return (
    <div className="icons">
      {icons.map((icon) => (
        <IconItem
          key={icon.name}
          image={icon.image}
          name={icon.name}
          selected={selected}
          setSelected={setSelected}
          refr={icon.ref}
          showdropdown={showdropdown}
          setShowdropdown={setShowdropdown}
        />
      ))}
    </div>
  );
}
function IconItem({
  image,
  name,
  selected,
  setSelected,
  refr,
  setShowdropdown,
  showdropdown,
}: {
  image: string;
  name: string;
  selected: string;
  setSelected: (selected: string) => void;
  refr: React.RefObject<HTMLDivElement>;
  showdropdown: {
    show: boolean;
    x: number;
    y: number;
  };
  setShowdropdown: (showdropdown: {
    show: boolean;
    x: number;
    y: number;
  }) => void;
}) {
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
        const left = rect?.left;
        const top = rect?.top;
        if (left && top) {
          x = x - left - 5;
          y = y - top + 220;
        }

        setShowdropdown({
          show: true,
          x,
          y,
        });
        setSelected(name);
      });
    }
  }, [refr]);

  return (
    <div
      className="icon clickablelink"
      ref={refr}
      onClick={() => {
        setSelected(name);
      }}
      onDoubleClick={() => {
        setSelected("");
      }}
    >
      <div className="icon__logo">
        <img src={image} alt={name} className="icon__image" />
      </div>
      <div
        className="icon__text"
        style={{
          backgroundColor: selected === name ? "blue" : "transparent",
        }}
      >
        {name}
      </div>
      {showdropdown.show && selected === name && (
        <RightClickDropDown top={showdropdown.y} left={showdropdown.x}>
          <RightClickDropDownItem onClick={() => alert("Open")}>
            Open
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Explore")}>
            Explore
          </RightClickDropDownItem>

          <RightClickDropDownSeparator />
          <RightClickDropDownItem onClick={() => alert("Short")}>
            Create Shortcut
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Rename")}>
            Rename
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Cut")}>
            Cut
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Copy")}>
            Copy
          </RightClickDropDownItem>
          <RightClickDropDownItem onClick={() => alert("Delete")}>
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
