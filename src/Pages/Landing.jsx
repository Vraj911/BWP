import { Link } from "react-router-dom";
import React from "react";
function LandingPage() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center 
                 bg-[var(--color-background)] 
                 text-[var(--color-text-primary)] 
                 font-[var(--font-primary)] px-6"
    >
      <img 
        src="/logo.jpg" 
        alt="logo" 
        className="w-24 h-24 mb-6"
      />

      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Welcome to GoIndia
      </h1>

      <p className="text-[var(--color-text-secondary)] text-lg max-w-xl text-center mb-8">
        The online shark tank
      </p>

      <Link
        to="/signup"
        className="px-6 py-3 rounded-xl text-lg font-semibold 
                   bg-[var(--color-accent-blue)] text-black 
                   hover:opacity-90 transition-all"
      >
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
