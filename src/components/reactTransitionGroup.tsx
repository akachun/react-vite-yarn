import { useState } from "react";
import { Transition } from "react-transition-group";
function ReactTransitionGroup() {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };
  const duration = 300; // Animation duration in milliseconds
  // Custom styles for the enter animation
  const transitionStylesEnter = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exited: {},
    exiting: {},
    unmounted: {}
  };
  // Custom styles for the exit animation
  const transitionStylesExit = {
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
    entered: {},
    unmounted: {},
    entering: {}
  };
  return (
    <div>
      <button onClick={handleToggle}>Toggle Fade</button>
      <Transition in={show} timeout={duration}>
        {(state) => (
          <div
            className="fade-element"
            style={{
              ...transitionStylesEnter[state],
              ...transitionStylesExit[state],
              transition: `opacity ${duration}ms`, // Apply the custom animation duration
            }}
          >
            Hello, this is a fade animation!
          </div>
        )}
      </Transition>
    </div>
  );
}
export default ReactTransitionGroup;