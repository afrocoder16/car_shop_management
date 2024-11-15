import React from 'react';

export default function Workout() {
  return (
    <div style={{ padding: '20px', height: '100vh', marginTop: '200px'}}>
      {/* Top Title */}
      <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>About Us</h2> <br />

      {/* Main Content Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
        {/* Left side: About Us Content */}
        <div style={{ flex: 1, paddingRight: '20px',paddingTop: '100px'  }}>
          <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '15px' }}>
            Welcome to Car Service Hub!
          </p>
          
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            At Car Service Hub, we are passionate about keeping your vehicle in top condition. Our mission is to deliver high-quality car maintenance and repair services to ensure your vehicle remains safe, efficient, and reliable on the road. Our team of certified, highly skilled mechanics brings years of experience to every job, from routine oil changes and brake inspections to complex engine repairs and diagnostic services. We use state-of-the-art equipment and the latest industry practices to provide thorough, precise, and dependable work. Trust us to treat your car with care, integrity, and attention to detail, so you can drive confidently, knowing your vehicle is in expert hands.
          </p>

          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            Contact us at (123) 456-7890 or visit our service center for more information.
          </p>
        </div>

        {/* Right side: Image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://www.r2cthemes.com/brakesplus/i/bg/servicesAlignment.jpg"  // Replace this with your actual image path
            alt="Car Service Hub"
            style={{ width: '100%', maxWidth: '960px', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
}
