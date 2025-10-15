import React, { useState } from 'react';
import { Committee } from '../types';

const Committees: React.FC = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);

  const committees: Committee[] = [
    {
      id: '1',
      name: 'United Nations Security Council (UNSC)',
      topic: 'Addressing the Crisis in the South China Sea',
      description: 'The Security Council will address escalating tensions in the South China Sea, focusing on territorial disputes, freedom of navigation, and resource exploitation. Delegates will work toward a resolution that balances national interests with international law and regional stability.',
      positions: ['United States', 'China', 'Russia', 'United Kingdom', 'France', 'India', 'Japan', 'Australia', 'Philippines', 'Vietnam', 'Malaysia', 'Indonesia']
    },
    {
      id: '2',
      name: 'United Nations Human Rights Council (UNHRC)',
      topic: 'Protecting Digital Rights in the Age of Surveillance',
      description: 'This committee will examine the growing tension between national security measures and individual privacy rights in the digital realm. Delegates will address issues of government surveillance, data protection, and the right to information in an increasingly connected world.',
      positions: ['United States', 'China', 'Russia', 'Germany', 'France', 'United Kingdom', 'Japan', 'India', 'Brazil', 'South Africa', 'Mexico', 'Indonesia']
    },
    {
      id: '3',
      name: 'United Nations Environment Programme (UNEP)',
      topic: 'Combating Climate Change Through International Cooperation',
      description: 'Delegates will address the urgent need for coordinated global action to combat climate change. The committee will focus on implementing the Paris Agreement, financing green transitions, and supporting vulnerable nations in adapting to environmental changes.',
      positions: ['United States', 'China', 'India', 'European Union', 'Russia', 'Brazil', 'Indonesia', 'Japan', 'Canada', 'Australia', 'South Korea', 'Mexico']
    },
    {
      id: '4',
      name: 'World Health Organization (WHO)',
      topic: 'Strengthening Global Pandemic Preparedness',
      description: 'In light of recent global health crises, this committee will focus on improving international mechanisms for pandemic prevention, detection, and response. Delegates will address issues of vaccine equity, healthcare infrastructure, and international cooperation in public health emergencies.',
      positions: ['United States', 'China', 'Germany', 'Japan', 'United Kingdom', 'France', 'India', 'Brazil', 'Italy', 'South Africa', 'Canada', 'Australia']
    },
    {
      id: '5',
      name: 'United Nations Children\'s Fund (UNICEF)',
      topic: 'Ensuring Education Access in Conflict Zones',
      description: 'This committee will address the challenges of providing education to children in areas affected by armed conflict and humanitarian crises. Delegates will explore solutions for protecting educational institutions, supporting displaced students, and maintaining continuity of learning in emergency situations.',
      positions: ['United States', 'United Kingdom', 'Japan', 'Germany', 'France', 'Canada', 'Australia', 'Norway', 'Sweden', 'Netherlands', 'Denmark', 'Switzerland']
    },
    {
      id: '6',
      name: 'United Nations Office on Drugs and Crime (UNODC)',
      topic: 'Addressing Transnational Organized Crime in the Digital Age',
      description: 'Delegates will tackle the evolving landscape of transnational organized crime, particularly cybercrime, human trafficking, and illicit financial flows. The committee will focus on strengthening international legal frameworks and improving cross-border cooperation to combat these threats.',
      positions: ['United States', 'China', 'Russia', 'United Kingdom', 'France', 'Germany', 'Japan', 'India', 'Brazil', 'Italy', 'Canada', 'Australia']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Conference Committees</h1>
        
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-lg">
            Our conference features six committees, each addressing a critical global issue. 
            Click on a committee to learn more about its topic and available positions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {committees.map((committee) => (
            <div
              key={committee.id}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all ${
                selectedCommittee === committee.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedCommittee(selectedCommittee === committee.id ? null : committee.id)}
            >
              <h3 className="text-xl font-semibold mb-2">{committee.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{committee.topic}</p>
              <p className="text-gray-600 line-clamp-3">
                {committee.description}
              </p>
              <div className="mt-4 text-blue-600 font-medium">
                {selectedCommittee === committee.id ? 'Click to collapse' : 'Click to expand'}
              </div>
            </div>
          ))}
        </div>

        {selectedCommittee && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            {committees
              .filter((committee) => committee.id === selectedCommittee)
              .map((committee) => (
                <div key={committee.id}>
                  <h2 className="text-2xl font-semibold mb-4">{committee.name}</h2>
                  <h3 className="text-xl font-medium text-blue-600 mb-4">{committee.topic}</h3>
                  <p className="mb-6">{committee.description}</p>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-3">Available Positions:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {committee.positions.map((position) => (
                        <div
                          key={position}
                          className="bg-gray-100 p-3 rounded text-center"
                        >
                          {position}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Committees;