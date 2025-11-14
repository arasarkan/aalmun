import React, { useState } from 'react';

interface Members {
  id: string;
  photoURL: string;
  link?: string; // Optional link for each member
}

const Team: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const members: Members[] = [
    {
      id: '1',
      photoURL: "/assets/team/11.jpg",
      link: "https://www.instagram.com/p/DPwVNwDjSlX/?igsh=MTV0ZnpiY3pva2ticA==" 
    },
    {
      id: '2',
      photoURL: "/assets/team/12.jpg",
      link: "https://www.instagram.com/p/DPwVTjRjXRs/?igsh=MTFpaDNjODMzZzBheA=="
    },
    {
      id: '3',
      photoURL: "/assets/team/13.jpg",
      link: "https://www.instagram.com/p/DPwVW_DjXE6/?igsh=MW9mZzE5NTR4eXZodA=="
    },
    {
      id: '4',
      photoURL: "/assets/team/14.jpg",
      link: "https://www.instagram.com/p/DPwVig1jRhO/?igsh=MWY0b2UycGdyMmMxeg=="
    },
    {
      id: '5',
      photoURL: "/assets/team/1.jpg",
      link: "https://www.instagram.com/p/DPl_D_fDbGW/?igsh=MWNwb3IyaTY0NXVhNQ=="
    },
    {
      id: '6',
      photoURL: "/assets/team/2.jpg",
      link: "https://www.instagram.com/p/DPl_MBBjYvM/?igsh=OHVkZGNyZGE4bDJl"
    },
    {
      id: '7',
      photoURL: "/assets/team/3.jpg",
      link: "https://www.instagram.com/p/DPl-_W3jdNU/?igsh=MWdwNXBlMnhjcmdzcQ=="
    },
    {
      id: '8',
      photoURL: "/assets/team/4.jpg",
      link: "https://www.instagram.com/p/DPl_IdmDWWe/?igsh=N3R2aGZ2bHVyemM="
    },
    {
      id: '9',
      photoURL: "/assets/team/5.jpg",
      link: "https://www.instagram.com/p/DPl-tMMDREM/?igsh=MWlrYnl4ZjN2Zmpocg=="
    },
    {
      id: '10',
      photoURL: "/assets/team/6.jpg",
      link: "https://www.instagram.com/p/DPl-oF8jaep/?igsh=MXFqYmtwM3ZoaXdteA=="
    },
    {
      id: '11',
      photoURL: "/assets/team/7.jpg",
      link: "https://www.instagram.com/p/DPl-0txDa6r/?igsh=Z29nMXpic3k5M2R0"
    },
    {
      id: '12',
      photoURL: "/assets/team/8.jpg",
      link: "https://www.instagram.com/p/DPl-iiPjYOO/?igsh=MW1va2FyYWRrMGI0eg=="
    },
    {
      id: '13',
      photoURL: "/assets/team/9.jpg",
      link: "https://www.instagram.com/p/DPl-6FljV2b/?igsh=MXQ5NDF2Ym96M2VlOA=="
    },
    {
      id: '14',
      photoURL: "/assets/team/10.jpg",
      link: "https://www.instagram.com/p/DPl_IdmDWWe/?img_index=1&igsh=N3R2aGZ2bHVyemM="
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageClick = (link?: string) => {
    if (link) {
      // If using React Router, you would use navigate(link) here
      // For now, we'll just open the link in a new tab
      window.open(link, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#471f27] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Our Team</h1>
        
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-lg text-white">
            Meet the dedicated organization members who are working tirelessly to make this conference a success! Click on their images to learn more about each member.
          </p>
        </div>

        <div className="relative max-w-sm mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {members.map((member) => (
                <div key={member.id} className="w-full flex-shrink-0 bg-[#7c1d36]">
                  <div className="flex justify-center">
                    <img 
                      src={member.photoURL} 
                      alt={`Member ${member.id}`} 
                      className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ maxHeight: '500px' }}
                      onClick={() => handleImageClick(member.link)}
                    />
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
          {members.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;