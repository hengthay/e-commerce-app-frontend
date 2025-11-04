import React from 'react'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

// Implement on view password
const EyeToggleIcon = ({isChecked, onClick, shouldPasswordLabelFloat}) => {
  return (
    <button
      type='button'
      aria-label={isChecked ? "Hide Password" : "Show Password"}
      onClick={onClick}
      >
        {
        isChecked ? (
            // Open eye
            <LuEye 
              onFocus={() => handleFocus('password')}
              size={24} className={`absolute right-2 top-2 transition-colors cursor-pointer ${shouldPasswordLabelFloat ? 'text-blue-400' : ''}`}
              />) :
              (
            // Closed eye
            <LuEyeClosed 
              onFocus={() => handleFocus('password')}
              size={24} className={`absolute right-2 top-2 transition-colors cursor-pointer ${shouldPasswordLabelFloat ? 'text-blue-400' : ''}`}/>
              )
        }
    </button>
  )
}

export default EyeToggleIcon