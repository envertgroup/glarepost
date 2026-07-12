/**
 * Performs a custom smooth scroll to a target element with controlled duration and premium cubic easing.
 * @param {string} targetSelector - CSS Selector of the target element
 * @param {number} duration - Animation duration in ms
 */
export const smoothScrollTo = (targetSelector, duration = 1200) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Cubic ease-in-out
  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };

  requestAnimationFrame(animation);
};
