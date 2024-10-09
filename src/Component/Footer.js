import React from "react";
import "./Footer.css"; // Create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Rising Destination. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
