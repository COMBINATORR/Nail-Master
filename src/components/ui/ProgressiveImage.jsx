import { useState } from 'react';

/**
 * ProgressiveImage - Blur-up image loader component with smooth CSS fade-in
 * and placeholder shimmer to prevent visual layout shifts.
 */
export const ProgressiveImage = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  style = {},
  draggable = false,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const fallbackSrc = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      {/* Blurred SVG shimmer placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-tr from-bronze-950/40 via-charcoal-900/60 to-bronze-900/20 backdrop-blur-md" />
      )}

      {/* Main Image */}
      <img
        src={isError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={draggable}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setIsError(true);
          onError?.(e);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-105'
        } ${imgClassName}`}
        style={style}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
