import React from "react";

interface OutputProps {
  value: string;
}

const Output: React.FC<OutputProps> = ({ value }) => {
  return (
    <textarea
      className="outputInfo mt-4 border border-gray-400 p-2 rounded w-[90%] min-h-105 h-fit text-xs"
      value={value}
      readOnly
    />
  );
};

export default Output;
