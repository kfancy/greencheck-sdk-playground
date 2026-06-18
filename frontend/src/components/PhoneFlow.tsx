import React, { useState, useContext } from "react";
import GCSDK from "@greencheck/sdk-client";
import ActionButton from "./shared/ActionButton";
import { SdkContext } from "../context/SdkContext";
import { useStartOver } from "../actions/navigation";

const PhoneFlow: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"input" | "validate">("input");
  const { appendProgress, appendOutput, sdkEvents } = useContext(SdkContext);
  const startOver = useStartOver();

  const send2FA = async () => {
    appendOutput(["Sending 2FA to phone..."]);
    try {
      const response = await GCSDK.startPhoneClaim(phone);
      if (response) {
        appendProgress(["Phone is valid and 2FA code sent", "Check your phone for 2FA code"]);
        setStep("validate");
      } else {
        appendOutput(["Failed to start phone claim"]);
      }
    } catch (e: any) {
      appendOutput(["Failed to start phone claim", e.toString()]);
    }
  };

  const validate2FA = async () => {
    appendOutput(["Validating phone 2FA..."]);
    try {
      const response = await GCSDK.validatePhoneClaim(code);
      if (response) {
        appendProgress([
          "2FA code validated",
          "PKCE token securely exchanged",
          "GreenCheck ID profile ready",
        ]);
        appendOutput(["Successful validation!", JSON.stringify(response)]);
      } else {
        appendOutput(["Failed to validate phone 2FA"]);
      }
    } catch (e: any) {
      appendOutput(["Failed to validate phone claim", e.toString()]);
    }
  };

  if (sdkEvents.greenCheckId) {
    return null;
  }

  return (
    <div className="space-y-2">
      {step === "input" && (
        <>
          <p>Input your mobile phone number:</p>
          <input
            className="border p-2 rounded w-full max-w-sm"
            placeholder="phone for verification"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <ActionButton label="Send 2FA Code" onClick={send2FA} />
            <ActionButton label="Start Over" onClick={startOver} />
          </div>
        </>
      )}
      {step === "validate" && (
        <>
          <p>Enter the code you received via SMS:</p>
          <input
            className="border p-2 rounded w-full max-w-sm"
            placeholder="2FA received in SMS"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <ActionButton label="Validate 2FA Code" onClick={validate2FA} />
            <ActionButton label="Start Over" onClick={startOver} />
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneFlow;
