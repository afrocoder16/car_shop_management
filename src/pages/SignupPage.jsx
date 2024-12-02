import React from 'react';
import Generator from '../components/Generator';
import Footer from '../components/Footer';
import Signup from '../components/Signup' ;


function Homepage() {
  return (
    <main >
      <Generator />
       <Signup />
       <Footer />
    </main>
  );
}

export default Homepage;
