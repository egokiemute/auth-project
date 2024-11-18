import React from 'react'
import Hero from '../components/landing/Hero'
import Benefits from '../components/landing/Benefits';
import WhyUs from '../components/landing/WhyUs';
import Community from '../components/landing/Community';
import FeaturedSpaces from '../components/landing/FeaturedSpaces';

const Home = () => {
  return (
    <>
    <Hero />
    <Benefits />
    <WhyUs />
    <FeaturedSpaces />
    <Community />
    </>
  )
}

export default Home;