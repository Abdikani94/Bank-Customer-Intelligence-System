import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ApiStatusProvider } from "./context/ApiStatusContext";

import "./styles.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Prediction = lazy(() => import("./pages/Prediction"));
const Segmentation = lazy(() => import("./pages/Segmentation"));
const Analytics = lazy(() => import("./pages/Analytics"));
const About = lazy(() => import("./pages/About"));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <span />
      <span />
      <span />
    </div>
  );
}

function ApplicationShell() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div
      className={`app-layout theme-dark ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      } ${
        mobileOpen ? "mobile-nav-open" : ""
      }`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setSidebarCollapsed((current) => !current)}
        onClose={() => setMobileOpen(false)}
      />

      <div
        className="mobile-overlay"
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div className="app-content">
        <Navbar onMenu={() => setMobileOpen(true)} />

        <main className="main-content" id="main-content">
          <div className="route-frame" key={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/prediction" element={<Prediction />} />
                <Route path="/segmentation" element={<Segmentation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ApiStatusProvider>
        <ApplicationShell />
      </ApiStatusProvider>
    </BrowserRouter>
  );
}

export default App;
