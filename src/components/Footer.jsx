import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-10 border-t border-[#232336] mt-12 w-full bg-transparent backdrop-blur-md">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="flex flex-wrap justify-evenly text-center md:text-left gap-y-8 md:gap-y-0">
          <div className="w-full sm:w-1/2 md:w-1/4 p-6">
            <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-[#6366F1]">Company</h3>
            <ul>
              <li className="mb-3">
                <Link className="text-base md:text-lg font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Features</Link>
              </li>
              <li className="mb-3">
                <Link className="text-base md:text-lg font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Pricing</Link>
              </li>
              <li className="mb-3">
                <Link className="text-base md:text-lg font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Affiliate</Link>
              </li>
              <li>
                <Link className="text-base md:text-lg font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-6">
            <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-[#6366F1]">Support</h3>
            <ul>
              <li className="mb-3">
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Account</Link>
              </li>
              <li className="mb-3">
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Help</Link>
              </li>
              <li className="mb-3">
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Contact</Link>
              </li>
              <li>
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-6">
            <h3 className="tracking-widest mb-6 text-xs font-semibold uppercase text-[#6366F1]">Legals</h3>
            <ul>
              <li className="mb-3">
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Terms</Link>
              </li>
              <li className="mb-3">
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-base font-medium text-[#F3F4F6] hover:text-[#6366F1] transition-colors" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-[#232336] pt-6">
          <p className="text-center text-sm text-gray-400">
    © {new Date().getFullYear()} Developed by <span className="font-semibold text-white">Soham</span>
  </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
