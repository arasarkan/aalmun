import React, { useState } from 'react';

interface CommitteeWithAcas {
  id: string;
  name: string;
  agendaItem: string;
  level: string;
  members: string;
}

const Committees: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const committees: CommitteeWithAcas[] = [
    {
      id: '1',
      name: 'Council of the European Union (CEU)',
      agendaItem: "The Impact of Artificial Intelligence on Human Labor and Skills: Productivity and Cognitive Decline <br> While artificial intelligence is transforming Europe's industries, providing efficiency and competitiveness, it is also raising concerns about malfunctions, the breakdown of traditional processes, and excessive reliance on machines. The European Council is considering whether the economic decision should be to prioritize rapid AI transformation or to implement systems and education reforms to protect human labor, critical thinking, and equity among member states.",
      level: "Intermediate",
      members: "Under-Secretary General: Beren Ulaş <br> Academic Assistant: Alperen Köseoğulları"
    },
    {
      id: '2',
      name: 'World Organization for Animal Health (WOAH)',
      agendaItem: "Global Policy Proposals to Address Endemic Species Extinction.",
      level: "Beginner",
      members: "Under-Secretary General: Kaan Cansızoğlu <br> Academic Assistant: Ceren Çiftçi"
    },
    {
      id: '3',
      name: 'Disarmament and International Security Committee (DISEC)',
      agendaItem: "Safeguarding Maritime Routes from Pirate Threats and Illicit Trafficking",
      level: "Beginner",
      members: "Under-Secretary General: Lamia Zeyno Çelebi & Günselin Şanıer"
    },
    {
      id: '4',
      name: 'Müşterek Kriz Komitesi (MKK)',
      agendaItem: " Vistül Nehri Havzası'ndaki Leh ve Çekoslovak şehirlerine NATO'nun ilk nükleer saldırısının ardından, Varşova Paktı komutanlarının Doğu Almanya'nın işgalini önlemek için ülkeye takviye gönderecekleri bir savaş senaryosuydu. Peki Varşova Paktı, 7 günde Ren Nehri'ne ve hatta 9 günde Lyon'a girebilecek mi, yoksa NATO bu saldırıya göğüs gerebilecek mi?",
      level: "İleri",
      members: "Komite Müsteşarı: Vasfi Kemal Bekar & Ali Başar Muslu <br> Kriz Ekip Üyesi: Kerem Okçu"
    },
    {
      id: '5',
      name: 'Crisis Committee (CC)',
      agendaItem: "Unification of Germany",
      level: "Advanced",
      members: "Under-Secretary General: Barış Tanrıverdi <br>Academic Assistant: Yaman Çınar Kahraman"
    },
    {
      id: '6',
      name: 'International Olympic Committee (IOC)',
      agendaItem: "a) Strengthening the Reputation of  Inadequately Represented Olympic Teams and Athletes <br> b) Strengthening Anti-Doping Measures and Enhancing Integrity in Global Sport",
      level: "asd",
      members: "Under-Secretary General: Siyabend Aladağ"
    },
    {
      id: '7',
      name: 'International Court of Justice (ICJ)',
      agendaItem: "Assessing Allegations of War Crimes Committed within the Palestinian Territories",
      level: "Advanced",
      members: "Under-Secretary General: Kerem Çiçek <br>Academic Assistants: Ege Kağan Günçan & Ege Akengin"
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
            Our conference features seven committees, each addressing a critical global issue. 
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
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Agenda Item</h4>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: committee.agendaItem }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Level</h4>
                    <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm font-medium">
                      {committee.level}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Committee Members</h4>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: committee.members }}
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