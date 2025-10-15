import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">About Our Conference</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conference Overview</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur alias voluptates quos, aperiam molestias nulla et assumenda necessitatibus expedita rerum, soluta sint laboriosam. Ipsa praesentium cumque, laboriosam temporibus totam et?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dolor aut non mollitia voluptates qui. Cumque distinctio eius nam inventore dicta architecto, reprehenderit, optio quas asperiores error quisquam in suscipit.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conference Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Date & Location</h3>
                <p>31</p>
                <p>31</p>
                <p>31</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Registration</h3>
                <p>31</p>
                <p>31</p>
                <p>31</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>test31</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;