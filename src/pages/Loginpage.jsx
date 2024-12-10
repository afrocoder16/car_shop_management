import React from 'react';
import Generator from '../components/Generator';
import Footer from '../components/Footer';
import Login from '../components/Login' ;


function Homepage() {
  return (
    <main >
      <Generator />
       <Login />
       <Footer />
    </main>
  );
}

export default Homepage;
