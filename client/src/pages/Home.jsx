import React from 'react';
import ProblemSearch from '../components/ProblemSearch';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-start">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mt-12 mb-4 text-center drop-shadow">Intelligent Similar Problem Search</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">Enter a problem description below to find similar or related problems from our database.</p>
      <ProblemSearch />
    </div>
  );
}

export default Home;
