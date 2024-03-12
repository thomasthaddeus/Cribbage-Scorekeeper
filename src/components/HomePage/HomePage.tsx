// src/components/HomePage/HomePage.tsx

import React from 'react';

interface HomePageProps {
  onNextStep: () => void; // Function to navigate to the next step in the application flow
}

const HomePage: React.FC<HomePageProps> = ({ onNextStep }) => {
  return (
    <div className="container text-center">
      <h1 className="mb-20">Welcome to the Cribbage Scoring App</h1>
      <p className="mb-20">This app will guide you through scoring a hand in cribbage.</p>
      <button onClick={onNextStep} className="mt-20">Start Scoring</button>
    </div>
  );
};

export default HomePage;
