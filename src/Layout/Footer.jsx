import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Auto Shop. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a
            href="/terms"
            className="hover:text-blue-500 text-sm transition duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            className="hover:text-blue-500 text-sm transition duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/contact"
            className="hover:text-blue-500 text-sm transition duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;