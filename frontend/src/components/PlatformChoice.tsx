import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "./shared/ActionButton";
import { useStartOver } from "../actions/navigation";
import { SdkContext } from "../context/SdkContext";

const PlatformChoice: React.FC = () => {
  const navigate = useNavigate();
  const startOver = useStartOver();
  const { sdkEvents } = useContext(SdkContext);
  const { authorized } = sdkEvents;
  return (
    <div className="flex gap-2">
      {!authorized && <ActionButton label="Claim Phone" onClick={() => navigate("/phone")} />}
      {!authorized && <ActionButton label="Claim Email" onClick={() => navigate("/email")} />}
      <ActionButton label="Start Over" onClick={startOver} />
    </div>
  );
};

export default PlatformChoice;
