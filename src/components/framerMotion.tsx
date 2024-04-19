import { useState } from "react";
import { motion } from "framer-motion";
import "./framer-motion.css"; // Import any CSS file if required
function FramerMotion() {
  // State to keep track of the animation toggle
  const [isActive, setIsActive] = useState(false);
  // Return the animated component
  return (
    <motion.div
      className="box"
      onClick={() => setIsActive(!isActive)} // Toggle the 'isActive' state on click
      animate={{
        rotate: isActive ? [0, 90, 180, 270] : [270, 180, 90, 0], // Rotate the element based on 'isActive' state
        borderRadius: isActive ? [0, 20, 50] : [50, 20, 0], // Change border radius based on 'isActive' state
      }}
    ></motion.div>
  );
}
export default FramerMotion;