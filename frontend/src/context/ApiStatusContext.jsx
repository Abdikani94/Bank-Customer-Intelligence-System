import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { checkApiHealth } from "../services/api";

const ApiStatusContext = createContext(null);

export function ApiStatusProvider({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    async function verifyApi() {
      try {
        await checkApiHealth();
        if (active) setStatus("connected");
      } catch {
        if (active) setStatus("disconnected");
      }
    }

    verifyApi();
    const timer = window.setInterval(verifyApi, 30000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const value = useMemo(() => ({ status }), [status]);

  return (
    <ApiStatusContext.Provider value={value}>
      {children}
    </ApiStatusContext.Provider>
  );
}

export function useApiStatus() {
  const context = useContext(ApiStatusContext);

  if (!context) {
    throw new Error("useApiStatus must be used inside ApiStatusProvider.");
  }

  return context;
}
