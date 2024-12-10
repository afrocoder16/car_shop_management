import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  
    const handleSubmit = () => {
      // Perform some action and then navigate
      navigate("/login");
    };
  return (
    <div>
      <header style={{ padding: '10px 20px', background: 'white', color: 'black' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/">
          {/* Website Name */} 
          <h1 style={{ fontSize: '1.5em', color: 'black' }}>
          GearUp Mechanics
          </h1>
          </Link>

          {/* Navigation Links */}
          <nav>
  <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
    <li><a href="#home" style={{ color: 'black', textDecoration: 'none' }}>Home</a></li>
    <li><a href="#about" style={{ color: 'black', textDecoration: 'none' }}>About</a></li>
    <li><a href="#services" style={{ color: 'black', textDecoration: 'none' }}>Services</a></li>
    <li><a href="#contact" style={{ color: 'black', textDecoration: 'none' }}>Contact</a></li>
  </ul>
</nav>


          {/* Login Button */}
          <button 
          onClick={handleSubmit}
          style={{
    padding: '8px 16px',
    background: 'linear-gradient(to right, #1e293b, #0f172a)', // slate-800 to slate-950
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }}>
            Login
          </button>
        </div>
      </header>
    </div>
  );
}
