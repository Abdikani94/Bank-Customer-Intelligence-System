import { Menu, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

import { useApiStatus } from "../context/ApiStatusContext";
import StatusBadge from "./StatusBadge";

const pageLabels = {
  "/": "Overview",
  "/prediction": "Subscription prediction",
  "/segmentation": "Customer segmentation",
  "/analytics": "Model analytics",
  "/about": "Project overview",
};

function Navbar({ onMenu }) {
  const location = useLocation();
  const { status } = useApiStatus();

  return (
    <header className="navbar">
      <div className="navbar-leading">
        <button
          className="menu-button"
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <span className="navbar-eyebrow">Bank customer intelligence</span>
          <h1>{pageLabels[location.pathname] || "Intelligence platform"}</h1>
        </div>
      </div>

      <div className="navbar-actions">
        <span className="model-chip">
          <Sparkles size={14} aria-hidden="true" />
          2 production models
        </span>

        <StatusBadge status={status} compact />
      </div>
    </header>
  );
}

export default Navbar;
