import { useEffect, useRef } from "react";
import anime from "animejs";
function AnimeJS() {
  const circleRef = useRef(null);
  const animateCircle = () => {
    // Get the DOM element to animate
    const circle = circleRef.current;
    // Use AnimeJS to create the animation
    anime({
      targets: circle,
      cx: anime.random(10, 500), // Random x position between 10 and 500
      cy: anime.random(10, 500), // Random y position between 10 and 500
      duration: 2000, // Animation duration in milliseconds
      easing: "easeInOutQuad", // Easing function for smooth animation
      complete: animateCircle, // Repeat the animation infinitely
    });
  };
  useEffect(() => {
    animateCircle();
  }, []);
  return (
    <svg width="500" height="500">
      <circle ref={circleRef} r="30" fill="blue" />
    </svg>
  );
}
export default AnimeJS;