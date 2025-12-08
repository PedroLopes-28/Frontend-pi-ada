import React from 'react'
import "./Header.css";

export default function Header({ showLogout = false }) {

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <header className="header-container">
      <h1>Sistema de Piadas</h1>

      {showLogout && (
        <button
          onClick={logout}
          style={{
            padding: "6px 12px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
          Logout
        </button>
      )}
    </header>
  );
}
