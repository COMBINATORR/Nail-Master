import React from 'react';

export const AnimatedGradientText = ({ children, className = '' }) => {
  return (
    <span 
      className={`inline-block bg-gradient-to-r from-[#b3afd1] via-[#d29ca9] via-[#eed2c4] to-[#a9d4c2] 
                 bg-[length:300%_300%] animate-gradient-flow bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};
