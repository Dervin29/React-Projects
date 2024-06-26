import React from 'react';
import './ToggleSwitch.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ToggleSwitch = ({ isDarkMode, onToggle }) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={onToggle}
        id="dark-mode-toggle"
      />
      <label htmlFor="dark-mode-toggle" className="toggle-label">
        {isDarkMode ? <MdOutlineDarkMode className=' text-white'/> : <MdOutlineLightMode/>}
      </label>
    </div>
  );
};

export default ToggleSwitch;
