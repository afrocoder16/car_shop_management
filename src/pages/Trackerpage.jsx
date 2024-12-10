import React from 'react';
import Generator from '../components/Generator';
import Footer from '../components/Footer';
import CarProgressTracker from '../components/tracker';


function Homepage() {
  return (
    <main >
      <Generator />
       <CarProgressTracker/>
       <Footer />
    </main>
  );
}

export default Homepage;
