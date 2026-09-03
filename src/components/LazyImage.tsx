import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  aspectRatio?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset load state when src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (!imgRef.current) return;

    // Use IntersectionObserver to defer setting src until within viewport margin (200px threshold)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '200px 0px',
          threshold: 0.01,
        }
      );

      observer.observe(imgRef.current);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for environments without IntersectionObserver
      setIsInView(true);
    }
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Subtle Skeleton Shimmer while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Actual Image rendered when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}

      {/* Fallback state if image fails to load */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center text-neutral-500">
          <span className="text-xs font-mono-tech uppercase">Image Unavailable</span>
        </div>
      )}
    </div>
  );
};
