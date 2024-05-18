import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">SpacePal</h2>
            <p className="text-gray-400">Explore the universe with us</p>
          </div>
            <p className="text-gray-400">&copy; 2024 SpacePal. All rights reserved.</p>
            <p className="text-gray-400 flex gap-8">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
