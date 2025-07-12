import React from "react";

const BlogLogo = ({ width = "40px" }) => (
  <svg width={width} height={width} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="16" fill="#6366F1"/>
    <path d="M26 14L16 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <rect x="15" y="23" width="2" height="6" rx="1" fill="white"/>
    <rect x="23" y="13" width="2" height="6" rx="1" fill="white" transform="rotate(45 23 13)"/>
  </svg>
);

export default BlogLogo;
