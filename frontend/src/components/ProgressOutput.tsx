import React, { useContext } from "react";
import Output from "./shared/Output";
import { SdkContext } from "../context/SdkContext";
// import { SDKContext } from "../context/SDKContext";

const ProgressOutput: React.FC = () => {
  const { progress, output } = useContext(SdkContext);
  return (
    <>
      <div id="progress" className="text-blue-500 mb-4">
        {progress.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <Output value={output.join("\n\n")} />
    </>
  );
};

export default ProgressOutput;
