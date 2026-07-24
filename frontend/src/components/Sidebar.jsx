import { NavLink } from "react-router-dom";

function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">BC</div>

        <div>
          <h1>Bank Intelligence</h1>
          <p>Customer Analytics</p>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <NavLink to="/" end className={getLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/prediction" className={getLinkClass}>
          Prediction
        </NavLink>

        <NavLink to="/segmentation" className={getLinkClass}>
          Segmentation
        </NavLink>

        <NavLink to="/analytics" className={getLinkClass}>
          Analytics
        </NavLink>

        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;