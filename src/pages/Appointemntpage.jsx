import React from 'react';
import Generator from '../components/Generator';
import Footer from '../components/Footer';
import Appointment from '../components/Appointment' ;


function Homepage() {
  return (
    <main >
      <Generator />
       <Appointment />
       <Footer />
    </main>
  );
}

export default Homepage;
