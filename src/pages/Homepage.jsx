import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Workout from '../components/Workout';
import Generator from '../components/Generator';
import AppointmentBooking from '../components/Appointment'; // Import the AppointmentBooking component
import Services from '../components/Services'
import Footer from '../components/Footer'


function Homepage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Generator />
       <Hero />
       <Services />
       <Workout />
       <Footer />
    </main>
  );
}

export default Homepage;
