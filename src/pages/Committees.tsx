import React, { useState } from 'react';

interface CommitteeWithAcas {
  id: string;
  name: string;
  photoURL: string;
}

const Committees: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const committees: CommitteeWithAcas[] = [
    {
      id: '1',
      name: 'Council of the European Union (CEU)',
      photoURL: "./../assets/committees/ceu_acas.jpg"
    },
    {
      id: '2',
      name: 'World Organization for Animal Health (WOAH)',
      photoURL: "./../assets/committees/woah_acas.jpg"
    },
    {
      id: '3',
      name: 'Disarmament and International Security Committee (DISEC)',
      photoURL: "./../assets/committees/disec_acas.jpg"
    },
    {
      id: '4',
      name: 'Joint Crisis Committee (JCC)',
      photoURL: "./../assets/committees/jcc_acas.jpg"
    },
    {
      id: '5',
      name: 'Crisis Committee (CC)',
      photoURL: "./../assets/committees/cc_acas.jpg"
    },
    {
      id: '6',
      name: 'International Olympic Committee (IOC)',
      photoURL: ""
    },
    {
      id: '7',
      name: 'International Court of Justice (ICJ)',
      photoURL: "./../assets/committees/icj_acas.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === committees.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? committees.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Conference Committees</h1>
        
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-lg">
            Our conference features six committees, each addressing a critical global issue. 
            Navigate through the slides to learn more about each committee's ACAS sections.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {committees.map((committee) => (
                <div key={committee.id} className="w-full flex-shrink-0 bg-white p-8">
                  <h2 className="text-2xl font-semibold mb-4">{committee.name}</h2>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-3">Academy members of the Committee</h4>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
                      <img src={committee.photoURL} alt={committee.name} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {committees.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Committee Preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {committees.map((committee, index) => (
            <div
              key={committee.id}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                currentSlide === index ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
              }`}
              onClick={() => goToSlide(index)}
            >
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">{committee.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Committees;