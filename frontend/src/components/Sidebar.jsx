import {
  BarChart3,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  Network,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/prediction", label: "Prediction", icon: BrainCircuit },
  { to: "/segmentation", label: "Segmentation", icon: Network },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/about", label: "About", icon: CircleHelp },
];

function Sidebar({ collapsed, onCollapse, onClose }) {
  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true">
          <Building2 size={21} />
        </div>

        <div className="brand-copy">
          <strong>Bank Intelligence</strong>
          <span>Decision platform</span>
        </div>

        <button
          className="mobile-close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      <span className="sidebar-label">Workspace</span>

      <nav className="sidebar-navigation">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={getLinkClass}
            title={collapsed ? label : undefined}
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-environment">
          <span className="environment-dot" />
          <div>
            <strong>Models ready</strong>
            <span>Production pipeline</span>
          </div>
        </div>

        <button
          className="collapse-button"
          type="button"
          onClick={onCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
