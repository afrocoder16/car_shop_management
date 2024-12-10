import React from 'react';

export default function Home() {
  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: '#ffffff' }}> {/* Set the background color here */}
      
      {/* Footer Section */}
      <footer style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #ddd' }}> {/* Removed specific background color */}
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Contact Us</h3>
        <p style={{ fontSize: '16px', marginBottom: '8px' }}>Phone: (123) 456-7890</p>
        <p style={{ fontSize: '16px', marginBottom: '8px' }}>Email: support@carservicehub.com</p>
        <p style={{ fontSize: '16px', marginBottom: '8px' }}>Visit us at: 123 Main Street, Marshall, MN 56258</p>
        <p style={{ fontSize: '16px', marginBottom: '8px' }}>Operating Hours: Monday - Friday, 8:00 AM - 6:00 PM</p>
        <p style={{ fontSize: '16px' }}>We’re here to assist with all your car maintenance and repair needs. Stop by our service center or give us a call for more information!</p>
      </footer>
    </div>
  );
}
