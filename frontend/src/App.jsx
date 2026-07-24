import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Segmentation from "./pages/Segmentation";
import Analytics from "./pages/Analytics";
import About from "./pages/About";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="app-content">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/segmentation" element={<Segmentation />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;