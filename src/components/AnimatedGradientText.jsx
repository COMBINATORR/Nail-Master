import React from 'react';

export const AnimatedGradientText = ({ children, className = '' }) => {
  return (
    <span 
      className={`inline-block bg-gradient-to-r from-[#c5a880] via-[#f5e5c9] via-[#e0a899] to-[#b49368] 
                 bg-[length:300%_300%] animate-gradient-flow bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};
