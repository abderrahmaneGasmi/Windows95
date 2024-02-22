import React from "react";
import "../styles/assets/rangeinput.scss";
import { motion } from "framer-motion";
export default function RangeInput() {
  const rangecontainer = React.useRef<HTMLDivElement>(null);
  return (
    <motion.div className="rangecontainer" ref={rangecontainer}>
      <motion.div
        className="rangecontainer__input"
        drag="y"
        dragConstraints={rangecontainer}
        dragElastic={0}
        dragTransition={{
          bounceDamping: 100,
          //   bounceStiffness: 1000,
          power: 0.005,
        }}
        // make y as 60px as the max value
      ></motion.div>
      <div className="rangecontainer__field"></div>
    </motion.div>
  );
}
