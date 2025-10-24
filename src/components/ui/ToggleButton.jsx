import React from 'react';

const ToggleButton = ({ 
  isPresent, 
  onToggle, 
  disabled = false,
  studentName,
  className = '' 
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onToggle(!isPresent);
    }
  };
  
  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isPresent 
          ? 'bg-green-600' 
          : 'bg-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isPresent ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default ToggleButton;


