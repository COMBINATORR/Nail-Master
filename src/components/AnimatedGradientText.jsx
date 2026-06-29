import React from 'react';

export const AnimatedGradientText = ({ children, className = '' }) => {
  return (
    <span 
      className={`inline-block bg-gradient-to-tr from-[#A855F7] via-[#FF4B91] via-[#FF7636] to-[#00D2C4] 
                 bg-[length:300%_300%] animate-gradient-flow bg-clip-text text-transparent px-[0.15em] mx-[-0.15em] ${className}`}
    >
      {children}
    </span>
  );
};
