import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { isMobileLike } from '../../lib/perf';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

/**
 * 3D tilt card on hover (desktop). Static image on touch devices.
 */
export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.06,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  onSelect,
  className = '',
}) {
  const ref = useRef(null);
  const lastY = useRef(0);
  const mobile = typeof window !== 'undefined' && isMobileLike();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0, springValues);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  function handleMouse(e) {
    if (mobile || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2 || 1)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2 || 1)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY.current;
    rotateFigcaption.set(-velocityY * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    if (mobile) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    if (mobile) return;
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    lastY.current = 0;
  }

  return (
    <figure
      ref={ref}
      className={`relative flex flex-col items-center justify-center [perspective:800px] cursor-pointer ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      aria-label={altText || captionText || undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: mobile ? 0 : rotateX,
          rotateY: mobile ? 0 : rotateY,
          scale: mobile ? 1 : scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-2xl shadow-xl [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && !mobile && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 z-[3] hidden rounded-md bg-[var(--bg-card)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-primary)] shadow-lg border border-[var(--border-color)] sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
