import React, { useEffect, useState } from "react";
import GCSDK from "@greencheck/sdk-client";
import Output from "./shared/Output";
import ActionButtonStatic from "./shared/ActionButtonStatic";
import { useSdkEvents } from "../hooks/useSdkEvents";

let outputArr: string[] = [];
const resetOutput = () => (outputArr = []);

const HelloWorld: React.FC = () => {
  const [output, setOutput] = useState<string>("");

  const { sdkIsInitialized } = useSdkEvents();

  // const postHandshake = async (outputArr: string[], response: any) => {
  //   if (!response?.sdkToken) {
  //     outputArr.push("NO TOKEN, failed handshake");
  //   } else {
  //     outputArr.push("ok, run HELLO WORLD");

  //     const hwResponse = await GCSDK.helloWorld();
  //     outputArr.push(`hello world response: ${JSON.stringify(hwResponse, null, 2)}`);
  //   }
  //   setOutput(outputArr.join("\n\n"));
  // };

  useEffect(() => {
    const run = async () => {
      resetOutput();
      if (sdkIsInitialized) {
        outputArr.push("ok, run HELLO WORLD");
        const hwResponse = await GCSDK.helloWorld();
        outputArr.push(`hello world response: ${JSON.stringify(hwResponse, null, 2)}`);
        setOutput(outputArr.join("\n\n"));
      }
    };
    run();
  }, [sdkIsInitialized]);

  const handleInit = (clientId: string, authServer: string) => async () => {
    setOutput("");
    resetOutput();
    await GCSDK.init(clientId, authServer);
  };

  const handlePkceTest = async () => {
    resetOutput();
    try {
      const testPkceToken = await GCSDK.getTestPkceToken();
      outputArr.push(`test token: ${testPkceToken}`);

      if (testPkceToken) {
        const exchangeResponse = await GCSDK.handleTestPkceToken(testPkceToken);
        outputArr.push(`test exchange response: ${JSON.stringify(exchangeResponse)}`);
      } else {
        outputArr.push("no testPkceToken to process");
      }
    } catch (e) {
      console.log(e);
      outputArr.push("caught error (unknown)");
    }

    setOutput(outputArr.join("\n\n"));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Run a handshake and CORS request to prove the SDK works.
      </h1>

      <div className="flex gap-4 flex-row mb-4">
        <ActionButtonStatic
          label="Start, good init data 🎉"
          // onClick={handleInit(import.meta.env.VITE_GC_CLIENT_ID, "https://auth.greencheck.world")}
          onClick={handleInit(
            import.meta.env.VITE_GC_CLIENT_ID,
            import.meta.env.VITE_GC_AUTH_SERVER
          )}
        />
        <ActionButtonStatic
          label="Start, bad Client ID"
          onClick={handleInit("bad-id", import.meta.env.VITE_GC_AUTH_SERVER)}
        />
        <ActionButtonStatic
          label="Start, bad auth server"
          onClick={handleInit("bad-id", "https://not-a-site.local")}
        />
        <ActionButtonStatic
          label="Test PKCE"
          onClick={handlePkceTest}
          disabled={!sdkIsInitialized}
        />
        <ActionButtonStatic label="Logout" onClick={() => GCSDK.logout()} />
      </div>

      <Output value={output} />
    </div>
  );
};

export default HelloWorld;
