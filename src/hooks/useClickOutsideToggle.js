// useClickOutsideToggle.js
// This changes the expanded state for the navbar toggle from expanded to closed, by clicking anywhere on the page
import { useEffect, useRef, useState } from 'react'

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null)
  useEffect(() => {
    // If the user clicks anywhere on the page, and the navbar toggle is expanded, the navbar toggle will close.
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  return { expanded, setExpanded, ref };
}

export default useClickOutsideToggle