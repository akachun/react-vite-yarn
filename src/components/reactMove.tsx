import { useState, useEffect } from "react";
import { Animate } from "react-move";
import "./AnimatedBars.css"; // Import the CSS file with the styles
// Define an array of colors for the bars
const colors = ["#236997", "#52aaeb", "#a75e07", "#f4a22d", "#f95b3aff"];
// Define an array of data values for the bars' heights
const data = [10, 26, 18, 14, 32];
function AnimatedBars() {
  // Initialize the state for the index of the data array
  const [index, setIndex] = useState(0);
  // Use the useEffect hook to set up the interval for updating the index
  useEffect(() => {
    // Set an interval to update the index every 2 seconds (2000 milliseconds)
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 2000);
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // Render the animated bars using react-move
  return (
    <div className="App">
      {/* Create an SVG element to draw the bars */}
      <svg version="1.1" viewBox="0 0 240 135" width="100vw">
        {/* Group the bars under a 'g' element */}
        <g>
          {/* Loop through the data array to create animated bars */}
          {data.map((value, i) => (
            // Use the Animate component to animate the bars' heights
            <Animate
              key={i}
              start={{ height: 0 }} // Initial state of the animation (height starts from 0)
              enter={{ height: [value], timing: { duration: 500 } }} // Target state when a new data value is added
              update={{
                height: [data[(i + index) % data.length]], // Target state when the index state changes
                timing: { duration: 500 },
              }}
            >
              {/* Render a rect element for each bar */}
              {(state) => (
                <rect
                  x={60 + 30 * i} // X position of the bar
                  y={115 - state.height} // Y position of the bar (height changes based on state)
                  width={24} // Width of the bar
                  height={state.height} // Height of the bar (changes based on state)
                  fill={colors[i % colors.length]} // Fill color of the bar (based on the colors array)
                />
              )}
            </Animate>
          ))}
        </g>
      </svg>
    </div>
  );
}
export default AnimatedBars;