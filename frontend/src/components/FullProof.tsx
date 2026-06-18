import React from "react";
import { Routes, Route } from "react-router-dom";

import Start from "./Start";
import PlatformChoice from "./PlatformChoice";
import PhoneFlow from "./PhoneFlow";
import EmailFlow from "./EmailFlow";
import ProgressOutput from "./ProgressOutput";
import { SdkProvider } from "../context/SdkContext";
import { LoggedInStatus } from "./shared/LoggedInStatus";

const FullProof: React.FC = () => {
  return (
    <SdkProvider>
      {/* This Router only wraps the internal FullProof flows */}
      {/* <Router> */}
      <div className="p-6 font-sans">
        <h1 className="text-4xl mb-4">GreenCheck SDK minimum POC</h1>
        <p className="mb-4">
          This demonstrates running the GC SDK from a third-party domain to show CORS, SDK handshake
          with server, and basic GC interactions.
        </p>

        <ProgressOutput />

        <Routes>
          <Route index element={<Start />} />
          <Route path="choose-platform" element={<PlatformChoice />} />
          <Route path="phone" element={<PhoneFlow />} />
          <Route path="email" element={<EmailFlow />} />
        </Routes>
        <LoggedInStatus />
      </div>
      {/* </Router> */}
    </SdkProvider>
  );
};

export default FullProof;
