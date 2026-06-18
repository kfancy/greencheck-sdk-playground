import { onAllEvents, GreenCheckEvent } from "@greencheck/sdk-client";
import { useState, useCallback, useEffect } from "react";

export interface SdkEventHook {
  isFetching: boolean;
  sdkIsInitialized: boolean;
  greenCheckId: string;
  authorized: boolean;
}

export const useSdkEvents = (): SdkEventHook => {
  const [sdkIsInitialized, setSdkIsInitialized] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [greenCheckId, setGreenCheckId] = useState("");

  const eventHandler = useCallback((eventData: GreenCheckEvent) => {
    console.log("event handler");
    console.log(eventData);
    const { event, data } = eventData;
    switch (event) {
      case "sdk-authorized":
        if (typeof data === "boolean") {
          setSdkIsInitialized(data);
        } else {
          setSdkIsInitialized(false);
        }
        break;
      case "authenticated":
        if (
          data && // todo: finish typing in SDK
          typeof data === "object" &&
          "greenCheckId" in data &&
          typeof data.greenCheckId === "string"
        ) {
          setGreenCheckId(data.greenCheckId);
        } else {
          setGreenCheckId("");
        }
        break;
      case "isFetching":
        if (typeof data === "boolean") {
          void setIsFetching(data);
        } else {
          void setIsFetching(false);
        }
        break;
    }
  }, []);

  useEffect(() => {
    const handler = onAllEvents(eventHandler);
    return () => {
      handler();
    };
  }, [eventHandler]);

  return {
    isFetching,
    sdkIsInitialized,
    greenCheckId,
    authorized: !!greenCheckId,
  };
};
