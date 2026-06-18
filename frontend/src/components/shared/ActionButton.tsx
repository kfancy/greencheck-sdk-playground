import { SdkContext } from "../../context/SdkContext";
import React, { useContext } from "react";

interface ActionButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, disabled = false, onClick }) => {
  const { sdkEvents } = useContext(SdkContext);
  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onClick}
        disabled={sdkEvents.isFetching || disabled}
      >
        {label}
      </button>
      {sdkEvents.isFetching && <span>fetching...</span>}
    </>
  );
};

export default ActionButton;
