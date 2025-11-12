import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Bookings from "./pages/Bookings";
import AddTool from "./components/AddTool";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav
        style={{
          padding: "10px 20px",
          background: "#1E2A38",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          {user && (
            <>
              <Link to="/bookings" style={linkStyle}>
                Bookings
              </Link>
              <Link to="/add" style={linkStyle}>
                Add Tool
              </Link>
              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>
            </>
          )}
        </div>

        <div>
          {!user ? (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/bookings" element={<Bookings user={user}/>} />
        <Route path="/add" element={<AddTool />} />
      </Routes>
    </Router>
  );
}

// ✅ Styling
const linkStyle = {
  marginRight: "15px",
  color: "#FFD166",
  textDecoration: "none",
  fontWeight: "bold",
};

const logoutButtonStyle = {
  background: "#EF476F",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
