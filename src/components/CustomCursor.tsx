import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { cursorVariant, cursorText, settings } = usePortfolio();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor ring lag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setIsTouchDevice(checkTouch());

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, smoothX, smoothY]);

  if (isTouchDevice || !settings.enableCustomCursor || !isVisible) {
    return null;
  }

  // Variant scales and styles
  const isLarge = cursorVariant === 'view' || cursorVariant === 'open';
  const isLink = cursorVariant === 'link' || cursorVariant === 'button';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Lagged Outer Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isLarge ? 80 : isLink ? 48 : 34,
            height: isLarge ? 80 : isLink ? 48 : 34,
            backgroundColor: isLarge ? 'rgba(16, 185, 129, 0.92)' : isLink ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            borderColor: isLarge ? 'transparent' : isLink ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 255, 255, 0.25)',
            borderWidth: isLarge ? 0 : 1,
            scale: 1
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-lg shadow-black/50"
        >
          {isLarge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[11px] font-bold tracking-widest text-black uppercase font-mono-tech"
            >
              {cursorText || (cursorVariant === 'view' ? 'VIEW' : 'OPEN')}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Immediate Center Dot */}
      {!isLarge && (
        <div
          className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-10 transition-transform duration-75"
          style={{
            transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
            boxShadow: '0 0 8px #10b981'
          }}
        />
      )}
    </div>
  );
};
