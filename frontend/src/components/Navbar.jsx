import { useEffect, useState } from "react";
import { checkApiHealth } from "../services/api";

function Navbar() {
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    async function verifyApi() {
      try {
        await checkApiHealth();

        if (active) {
          setApiStatus("connected");
        }
      } catch {
        if (active) {
          setApiStatus("disconnected");
        }
      }
    }

    verifyApi();

    return () => {
      active = false;
    };
  }, []);

  const statusText =
    apiStatus === "connected"
      ? "API Connected"
      : apiStatus === "disconnected"
        ? "API Disconnected"
        : "Checking API";

  return (
    <header className="navbar">
      <div>
        <h2>Bank Customer Intelligence System</h2>
        <p>Machine learning prediction and customer segmentation</p>
      </div>

      <div className={`api-status ${apiStatus}`}>
        <span className="status-indicator" />
        {statusText}
      </div>
    </header>
  );
}

export default Navbar;