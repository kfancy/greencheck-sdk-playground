import React, { createContext, useState, ReactNode, useCallback } from "react";
import { SdkEventHook, useSdkEvents } from "../hooks/useSdkEvents";

interface SdkContextType {
  progress: string[];
  output: string[];
  appendProgress: (lines: string | string[]) => void;
  appendOutput: (lines: string | string[]) => void;
  clearProgress: () => void;
  clearOutput: () => void;
  sdkEvents: SdkEventHook;
}

export const SdkContext = createContext<SdkContextType>({
  progress: [],
  output: [],
  appendProgress: () => {},
  appendOutput: () => {},
  clearProgress: () => {},
  clearOutput: () => {},
  sdkEvents: {} as SdkEventHook,
});

export const SdkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);

  const sdkEvents = useSdkEvents();

  const appendProgress = useCallback((lines: string | string[]) => {
    setProgress((prev) => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  const appendOutput = useCallback((lines: string | string[]) => {
    setOutput((prev) => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  const clearProgress = () => setProgress([]);
  const clearOutput = () => setOutput([]);

  return (
    <SdkContext.Provider
      value={{
        progress,
        output,
        appendProgress,
        appendOutput,
        clearProgress,
        clearOutput,
        sdkEvents,
      }}
    >
      {children}
    </SdkContext.Provider>
  );
};
