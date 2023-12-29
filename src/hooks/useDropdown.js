// useDropdown.js
// This custom hook manages the state for dropdowns, enabling conditional rendering
// based on mouse enter and leave events for a cleaner and reusable dropdown handling logic.
import { useState } from 'react';

const useDropdown = () => {
  const [friendDropdownOpen, setFriendDropdownOpen] = useState(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(null);

  // If the user hovers over the friends or projects dropdown navlink, it will display the dropdown menu.
  const handleMouseEnter = (dropdownId) => {
    if (dropdownId === 'friend-id') {
      setFriendDropdownOpen(dropdownId);
    } else if (dropdownId === 'project-id') {
      setProjectDropdownOpen(dropdownId);
    }
  };

  // If the user moves the mouse away from the friends or projects dropdown navlink, the dropdown menu will dissapear.
  const handleMouseLeave = () => {
    setFriendDropdownOpen(null);
    setProjectDropdownOpen(null);
  };

  return { friendDropdownOpen, projectDropdownOpen, handleMouseEnter, handleMouseLeave };
};

export default useDropdown;