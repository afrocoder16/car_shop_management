import React from 'react';

export default function ServiceSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white p-6">
      {/* Title Section */}
      <h2 className="text-4xl font-bold mb-8 text-center">Our Services</h2> {/* Increased font size and added bottom margin */}

      <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl mx-auto bg-slate-900 p-8 rounded-lg shadow-lg">
        
        {/* Image Section */}
        <div className="w-full md:w-3/4 h-80 flex justify-center">
          <img 
            src="https://www.sullivantire.com/-/media/digital-parts-image_1200x628.ashx"
            alt="Service illustration"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-gray-300">
            At our garage, we provide a comprehensive range of services to keep your vehicle in top condition. Our team of skilled mechanics is here to handle everything from routine maintenance to complex repairs.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Oil Change and Filter Replacement</li>
            <li>Tire Rotation and Alignment</li>
            <li>Brake Inspection and Replacement</li>
            <li>Engine Diagnostics and Repair</li>
            <li>Transmission Services</li>
            <li>Battery Testing and Replacement</li>
          </ul>
          <p className="text-gray-300">
            We pride ourselves on delivering high-quality, reliable service. Our goal is to ensure that your vehicle remains safe, reliable, and ready for the road.
          </p>
        </div>
      </div>
    </section>
  );
}
