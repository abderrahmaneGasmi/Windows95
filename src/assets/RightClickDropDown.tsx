import React from "react";
import "../styles/assets/rightclickdropdown.scss";
import { motion } from "framer-motion";
export default function RightClickDropDown({
  children,
  top,
  left,
}: {
  children: React.ReactNode;
  top?: number;
  left?: number;
}) {
  return (
    <motion.div
      className="rightclickdropdown"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      style={{
        transform: `translate(${left || 0}px, ${top || 0}px)`,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
export function RightClickDropDownItem({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`rightclickdropdown__item ${disabled ? " disabled" : ""}`}
      onClick={() => {
        if (disabled) {
          return;
        }
        onClick();
      }}
    >
      {children}
    </div>
  );
}
export function RightClickDropDownSeparator() {
  return <div className="rightclickdropdown__separator" />;
}
