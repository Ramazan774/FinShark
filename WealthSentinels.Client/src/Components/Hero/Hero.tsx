import React from 'react';
import hero from './hero.png';
import { Link } from 'react-router-dom';

interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero" className="bg-slate-900">
      <div className="container mx-auto flex flex-col-reverse items-center px-6 py-12 lg:flex-row lg:py-24">
        <div className="mb-10 flex flex-col space-y-6 text-center lg:mb-0 lg:w-1/2 lg:text-left">
          <h1 className="font-serif text-5xl font-bold leading-tight text-white lg:text-6xl">
            Unfiltered <br />
            <span className="text-emerald-400">financial intelligence.</span>
          </h1>
          <p className="text-lg text-gray-400 lg:max-w-md">
            Access official market data and filings directly - bypassing noise, hype, and headlines.
          </p>
          <div className="mx-auto flex justify-center lg:justify-start">
            <Link
              to="/search"
              className="rounded-full bg-emerald-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/50"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md lg:w-1/2">
        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-emerald-500 opacity-20 blur-3xl filter animate-pulse"></div>
          <img 
            src={hero} 
            alt="Financial Analysis"
            className='relative z-10 w-full object-contain drop-shadow-2xl' />
        </div>
      </div>
    </section>
  )
}

export default Hero