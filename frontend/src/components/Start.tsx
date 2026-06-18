import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GCSDK from "@greencheck/sdk-client";
import { SdkContext } from "../context/SdkContext";
import ActionButton from "./shared/ActionButton";

const Start: React.FC = () => {
  const { appendProgress, appendOutput, sdkEvents, clearOutput, clearProgress } =
    useContext(SdkContext);
  const navigate = useNavigate();

  const { sdkIsInitialized } = sdkEvents;

  useEffect(() => {
    if (sdkIsInitialized) {
      appendProgress(["Handshake complete"]);
      navigate("/choose-platform");
    }
  }, [appendProgress, navigate, sdkIsInitialized]);

  const handleInit = async () => {
    appendProgress("Initializing SDK...");
    try {
      if (!import.meta.env.VITE_GC_CLIENT_ID) {
        clearOutput();
        clearProgress();
        console.log(import.meta.env);
        throw new Error("wtf no meta");
      }

      await GCSDK.init(import.meta.env.VITE_GC_CLIENT_ID, import.meta.env.VITE_GC_AUTH_SERVER);
    } catch (e: any) {
      appendOutput(["Failed to initialize SDK", e.toString()]);
    }
  };

  return (
    <ActionButton disabled={sdkIsInitialized} label="Start SDK Handshake" onClick={handleInit} />
  );
};

export default Start;
