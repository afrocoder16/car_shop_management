import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '20px', 
      textAlign: 'center', 
      background: '#ffffff' // Background gradient
    }}>
      <h2 style={{ 
        marginBottom: '30px', 
        fontSize: '36px', 
        fontWeight: 'bold', 
        color: 'black' 
      }}>
        Contact Us
      </h2>
      <p style={{ margin: '0', fontSize: '16px', color: 'black' }}>
        Have questions or need assistance? We’re here to provide the support you need.
      </p>
      <p style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
        Call us at <a href="tel:1234567890" style={{ textDecoration: 'none', color: 'black' }}>(123) 456-7890</a>
      </p>
      <p style={{ margin: '15px 0', fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
        Or visit our service center for personalized help from our team.
      </p>
      <p style={{ margin: '0', fontSize: '14px', color: 'black' }}>
        We’re available Monday through Friday, 9:00 AM - 5:00 PM. Let us make your experience seamless and worry-free.
      </p>
    </footer>
  );
};

export default Footer;
