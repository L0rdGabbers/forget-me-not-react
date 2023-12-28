import { useState } from 'react';

const useDropdown = () => {
  const [friendDropdownOpen, setFriendDropdownOpen] = useState(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(null);

  const handleMouseEnter = (dropdownId) => {
    if (dropdownId === 'friend-id') {
      setFriendDropdownOpen(dropdownId);
    } else if (dropdownId === 'project-id') {
      setProjectDropdownOpen(dropdownId);
    }
  };

  const handleMouseLeave = () => {
    setFriendDropdownOpen(null);
    setProjectDropdownOpen(null);
  };

  return { friendDropdownOpen, projectDropdownOpen, handleMouseEnter, handleMouseLeave, setFriendDropdownOpen, setProjectDropdownOpen };
};

export default useDropdown;