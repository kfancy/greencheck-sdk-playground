import React, { useState, useContext } from "react";
import GCSDK from "@greencheck/sdk-client";
import ActionButton from "./shared/ActionButton";
import { SdkContext } from "../context/SdkContext";
import { useStartOver } from "../actions/navigation";

const EmailFlow: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"input" | "validate">("input");
  const { appendProgress, appendOutput, sdkEvents } = useContext(SdkContext);
  const startOver = useStartOver();

  const send2FA = async () => {
    appendOutput(["Sending 2FA to email..."]);
    try {
      const response = await GCSDK.startEmailClaim(email);
      if (response) {
        appendProgress(["Email is valid and 2FA code sent", "Check your email for 2FA code"]);
        setStep("validate");
      } else {
        appendOutput(["Failed to start email claim"]);
      }
    } catch (e: any) {
      appendOutput(["Failed to start email claim", e.toString()]);
    }
  };

  const validate2FA = async () => {
    appendOutput(["Validating email 2FA..."]);
    try {
      const response = await GCSDK.validateEmailClaim(code);
      if (response) {
        appendProgress([
          "2FA code validated",
          "PKCE token securely exchanged",
          "GreenCheck ID profile ready",
        ]);
        appendOutput(["Successful validation!", JSON.stringify(response)]);
      } else {
        appendOutput(["Failed to validate email 2FA"]);
      }
    } catch (e: any) {
      appendOutput(["Failed to validate email claim", e.toString()]);
    }
  };

  if (sdkEvents.greenCheckId) {
    return null;
  }

  return (
    <div className="space-y-2">
      {step === "input" && (
        <>
          <p>Input your email:</p>
          <input
            className="border p-2 rounded w-full max-w-sm"
            placeholder="email for verification"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <ActionButton label="Send 2FA Code" onClick={send2FA} />
            <ActionButton label="Start Over" onClick={startOver} />
          </div>
        </>
      )}
      {step === "validate" && (
        <>
          <p>Enter the code you received via email:</p>
          <input
            className="border p-2 rounded w-full max-w-sm"
            placeholder="2FA received in email"
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

export default EmailFlow;
