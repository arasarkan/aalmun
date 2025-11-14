import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AALMUN 2026</h3>
            <p className="text-gray-400">
              Join us for an exciting Model United Nations experience.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-white">
                  Team
                </a>
              </li>
              <li>
                <a href="/committees" className="hover:text-white">
                  Committees
                </a>
              </li>
              <li>
                <a href="/apply" className="hover:text-white">
                  Apply
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email: aalmun26@gmail.com
              <br />
              Phone: +90 (506) 399 27 71
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2026 AALMUN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;