import React from "react";
import { useStartOver } from "../../actions/navigation";
import { SdkContext } from "../../context/SdkContext";
import { useContext } from "react";
import ActionButton from "./ActionButton";

export const LoggedInStatus = () => {
  const { sdkEvents } = useContext(SdkContext);
  const startOver = useStartOver();

  if (sdkEvents.greenCheckId) {
    return (
      <div className="space-y-2">
        <h3>Logged in!</h3>
        <p>GC ID: {sdkEvents.greenCheckId}</p>
        <ActionButton label="Logout" onClick={startOver} />
      </div>
    );
  }

  return null;
};
