import React from "react";

export function Logo({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="black" />
      
      <g fill="white">
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
      </g>
    </svg>
  );
}