/**
 * Hero highlight — cream / rose / gold flowing gradient + soft outer glow.
 * Glow is a blurred duplicate under the clipped fill (reliable in Chromium).
 */
export const AnimatedGradientText = ({ children, className = '' }) => {
  return (
    <span className={`agt ${className}`.trim()}>
      <span className="agt__glow" aria-hidden="true">
        {children}
      </span>
      <span className="agt__fill">{children}</span>
    </span>
  );
};
