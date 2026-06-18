import { useContext } from "react";
import GCSDK from "@greencheck/sdk-client";

import { SdkContext } from "../context/SdkContext";
import { useNavigate } from "react-router-dom";

export const useStartOver = () => {
  const { clearOutput, clearProgress } = useContext(SdkContext);
  const navigate = useNavigate();

  return () => {
    GCSDK.logout();
    clearOutput();
    clearProgress();
    navigate("/");
  };
};
