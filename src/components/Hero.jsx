import React from 'react';
import { useNavigate } from "react-router-dom";



export default function Hero() {

    const navigate = useNavigate();
  
    const handleSubmit = () => {
      // Perform some action and then navigate
      navigate("/login");
    };
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
      <div className='flex flex-col gap-4'>
        <p>IT'S TIME TO GET YOUR CAR</p>
        <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
          Serviced<span className='text-blue-400'> Right</span>
        </h1>
      </div>
      <p className='text-sm md:text-base font-light'>
        We’re committed to getting your vehicle back on the road in perfect condition.
        <span className='text-blue-400 font-medium'> Our expert mechanics</span> provide top-notch service, ensuring every detail is checked. Rest assured, we’ll treat your car as if it’s our own, making it reliable, safe, and road-ready.
      </p>
      <button
        onClick={handleSubmit}
        className='px-8 py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow'>

        <p>Book Your Service</p>

      </button>
    </div>
  );
}
