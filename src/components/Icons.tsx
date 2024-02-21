import React, { useEffect, useState } from "react";
import "../styles/components/icons.scss";
const icons = [
  {
    image: "/pc.png",
    name: "This PC",
  },
  {
    image: "/networks.png",
    name: "Networks",
  },
  {
    image: "/wrong.png",
    name: "program.exe",
  },
];

export default function Icons() {
  const [selected, setSelected] = useState("");

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
}: {
  image: string;
  name: string;
  selected: string;
  setSelected: (selected: string) => void;
}) {
  return (
    <div
      className="icon"
      onClick={() => {
        setSelected(name);
      }}
      onDoubleClick={() => {
        setSelected("");
      }}
    >
      <div className="icon__logo">
        <img src={image} alt={name} />
      </div>
      <div
        className="icon__text"
        style={{
          backgroundColor: selected === name ? "blue" : "transparent",
        }}
      >
        {name}
      </div>
    </div>
  );
}
