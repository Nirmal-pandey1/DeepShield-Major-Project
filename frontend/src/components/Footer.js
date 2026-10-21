import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-content">
        <h3 className="logo">DeepShield</h3>
        <p>Image, video, audio, URL and QR code checks in one workspace.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/detect">Detection Studio</Link>
          <Link to="/history">History</Link>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} DeepShield. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;