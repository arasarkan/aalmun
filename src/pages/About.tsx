import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">About Our Conference</h1>
        
        {/*
          Using a flex-col layout with a gap is the most reliable way to control
          vertical spacing between elements. The 'gap-8' class adds a
          consistent 2rem (32px) space between each child div.
        */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Conference Overview</h2>
            <p className="mb-4">
             This year, AALMUN26 returns for its second edition, bringing together curious and passionate students to explore global issues in a hands-on way. Step into the shoes of diplomats, debate, negotiate, and build solutions together with peers from diverse backgrounds.
            </p>
            <p>
              Through interactive workshops, lively debates, and realistic simulations, AALMUN26 is more than a conference. It’s an experience that sparks curiosity, sharpens skills, and connects future leaders from around the world.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Conference Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Date & Location</h3>
                <p>9-10-11 February 2026</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <p>Atakent Anadolu Lisesi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;