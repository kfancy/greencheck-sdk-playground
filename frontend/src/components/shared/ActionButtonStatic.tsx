import React from "react";

interface ActionButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
}

const ActionButtonStatic: React.FC<ActionButtonProps> = ({ label, disabled = false, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButtonStatic;
