import React, { useState } from "react";
import { Container, LogoutButton } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogLogo from "../Logo";

const navItems = [
  { name: "Home", url: "/", auth: "any" },
  { name: "All Posts", url: "/all-posts", auth: true },
  { name: "Add Post", url: "/add-post", auth: true },
  { name: "Login", url: "/login", auth: false },
  { name: "Signup", url: "/signup", auth: false },
];

function Sidebar({ open, onClose, authStatus }) {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${open ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      <aside className={`absolute right-0 top-0 h-full w-64 bg-black shadow-lg p-6 flex flex-col gap-6 animate-fade-in transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} style={{ minHeight: '100vh' }}>
        <div className="flex items-center justify-between mb-8">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
            <BlogLogo width="36px" />
            <span className="text-lg font-bold text-[#F3F4F6]">BlogSphere</span>
          </NavLink>
          <button onClick={onClose} className="text-[#F3F4F6] text-2xl">&times;</button>
        </div>
        <ul className="flex flex-col gap-4">
          {navItems.map((item) =>
            (item.auth === "any" || item.auth === authStatus) ? (
              <li key={item.name}>
                <NavLink
                  to={item.url}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg font-medium text-[#F3F4F6] transition-colors duration-200 hover:text-[#6366F1] ${
                      isActive ? "bg-[#232336] font-bold" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
}

const Header = () => {
  const authStatus = useSelector((state) => state.auth?.status);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <Container>
        <nav className="flex flex-wrap items-center py-3 gap-y-2 md:gap-y-0">
          <div className="mr-6 flex-shrink-0 flex items-center">
            <NavLink to="/">
              <BlogLogo width="45px" />
            </NavLink>
          </div>
          <button
            className="md:hidden ml-auto text-[#F3F4F6] text-2xl focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <ul className="hidden md:flex flex-row gap-2 md:gap-4 ml-auto items-center w-full md:w-auto">
            {navItems.map((item) =>
              (item.auth === "any" || item.auth === authStatus) ? (
                <li key={item.name} className="w-full md:w-auto">
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `relative block px-4 py-2 rounded-full font-medium text-[#F3F4F6] transition-colors duration-200 hover:text-[#6366F1] text-center md:text-left ${
                        isActive
                          ? "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:w-8 after:h-1 after:rounded-full after:bg-[#6366F1] after:content-[''] font-bold"
                          : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="w-full md:w-auto">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} authStatus={authStatus} />
      </Container>
      <div className="text-center border-t border-[#232336] ml-10 mr-10"></div>
    </header>
  );
};

export default Header;
