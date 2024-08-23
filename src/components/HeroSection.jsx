import React from 'react';



const HeroSection = () => {
  return (
    <section className="hero-section bg-blue-500 text-white py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to FoodGlobal</h1>
      <p className="text-xl mb-8">Discover the best recipes from around the world.</p>
      <Link to="/explore" className="bg-yellow-500 text-black py-2 px-4 rounded">Explore</Link>
    </section>
  );
};

export default HeroSection;
