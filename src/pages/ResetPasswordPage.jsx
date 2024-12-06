import React from 'react';
import Generator from '../components/Generator';
import Footer from '../components/Footer';
import ResetPassword from '../components/ResetPassword';


function Homepage() {
  return (
    <main >
      <Generator />
       <ResetPassword/>
       <Footer />
    </main>
  );
}

export default Homepage;
