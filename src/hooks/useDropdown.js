import { useState } from 'react'

const useDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleMouseEnter = (dropdownId) => {
      setDropdownOpen(dropdownId);
    };

  const handleMouseLeave = () => {
      setDropdownOpen(null);
    };
  return { dropdownOpen, handleMouseEnter, handleMouseLeave }
}

export default useDropdown;