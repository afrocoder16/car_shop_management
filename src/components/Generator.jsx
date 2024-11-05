import React from 'react';

export default function Header() {
  return (
    <div>
      <header style={{ padding: '10px 20px', backgroundColor: 'gray', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Website Name */}
          <h1 style={{ fontSize: '1.5em', color: '#fff' }}>
            MyWebsite
          </h1>

          {/* Navigation Links */}
          <nav>
            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ color: '#fff' }}>Home</li>
              <li style={{ color: '#fff' }}>About</li>
              <li style={{ color: '#fff' }}>Services</li>
              <li style={{ color: '#fff' }}>Contact</li>
            </ul>
          </nav>

          {/* Login Button */}
          <button style={{
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
