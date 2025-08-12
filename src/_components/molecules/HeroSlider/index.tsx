"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface CarouselConfig {
  slideHeight: number;
  slidesInRing: number;
  slideSpacing: number;
  radius: number;
  initialRotation: number;
  autoRotate: boolean;
  rotationSpeed: number;
  rotationDirection: 1 | -1;
  pauseOnHover: boolean;
  resumeDelay: number;
  pauseEaseDuration: number;
  entranceAnimation: 'fadeIn' | 'fadeUp' | 'none';
  entranceDuration: number;
  entranceStagger: number;
  entranceDistance: number;
}

export interface SlideData {
  id?: string;
  src?: string;
  alt?: string;
}

interface CurvedCarouselProps {
  slides: SlideData[];
  config?: Partial<CarouselConfig>;
  fadeout?: boolean;
  className?: string;
}

const defaultConfig: CarouselConfig = {
  slideHeight: 600,
  slidesInRing: 21,
  slideSpacing: 1,
  radius: 1200,
  initialRotation: 180,
  autoRotate: true,
  rotationSpeed: 0.1,
  rotationDirection: 1,
  pauseOnHover: true,
  resumeDelay: 0,
  pauseEaseDuration: 0.5,
  entranceAnimation: 'fadeIn',
  entranceDuration: 1.5,
  entranceStagger: 0.1,
  entranceDistance: 100
};

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({ 
  slides, 
  config = {}, 
  fadeout = false,
  className = '' 
}) => {
  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [allSlides, setAllSlides] = useState<SlideData[]>([]);
  
  const carouselConfig = { ...defaultConfig, ...config };
  const updateRotationFunctionRef = useRef<(() => void) | null>(null);
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const speedControllerRef = useRef({ value: 0 });

  // CSS variables for the carousel
  const carouselStyles = {
    '--viewport-height': '35rem',
    '--viewport-height-m': '35rem',
    '--perspective': '600px',
    '--perspective-m': '400px',
    '--block-offset': '-18rem',
    '--block-offset-m': '-6rem',
    'overflow': 'hidden',
    // 'zIndex' : '-1',
    '--fadeout': fadeout 
      ? 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent 100%)'
      : 'none'
  } as React.CSSProperties;

  useEffect(() => {
    // Initialize slides, duplicating if necessary
    const originalSlideCount = slides.length;
    let processedSlides = [...slides];

    if (originalSlideCount < carouselConfig.slidesInRing) {
      const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
      for (let i = 0; i < duplicatesNeeded; i++) {
        const slideToClone = slides[i % originalSlideCount]!;
        processedSlides.push({
          ...slideToClone,
          id: `${slideToClone.id}-clone-${i}`
        });
      }
    }

    setAllSlides(processedSlides);
  }, [slides, carouselConfig.slidesInRing]);

  useEffect(() => {
    if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

    const ring = ringRef.current;
    const stage = stageRef.current;
    const slideElements = ring.querySelectorAll('.carousel-slide');
    const slideCount = slideElements.length;

    // Calculate dimensions
    const anglePerSlide = 360 / carouselConfig.slidesInRing;
    const arcLength = (anglePerSlide - carouselConfig.slideSpacing) * (Math.PI / 180) * carouselConfig.radius;
    const slideWidth = arcLength;

    console.log(`Total slides: ${slideCount}, Angle per slide: ${anglePerSlide}°, Width: ${slideWidth}px`);

    // Set container dimensions
    stage.style.width = `${slideWidth}px`;
    stage.style.height = `${carouselConfig.slideHeight}px`;

    // Auto-rotation variables
    let autoRotate = carouselConfig.autoRotate;
    let targetRotationSpeed = carouselConfig.rotationSpeed;
    let rotationDirection = carouselConfig.rotationDirection;

    // Initialize timeline
    const timeline = gsap.timeline();
    timeline.set(ring, {
      rotationY: carouselConfig.initialRotation
    });

    // Position slides in 3D space
    slideElements.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;
      slideElement.style.width = `${slideWidth}px`;
      slideElement.style.height = `${carouselConfig.slideHeight}px`;

      gsap.set(slide, {
        rotateY: index * -anglePerSlide,
        transformOrigin: `50% 50% ${carouselConfig.radius}px`,
        z: -carouselConfig.radius,
        backfaceVisibility: 'hidden'
      });
    });

    // Update rotation function
    const updateRotation = () => {
      const currentRotationSpeed = speedControllerRef.current.value;
      if (currentRotationSpeed === 0) return;

      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = currentTime;

      const rotationAmount = (deltaTime / 16.67) * currentRotationSpeed * rotationDirection;

      gsap.to(ring, {
        rotationY: `+=${rotationAmount}`,
        duration: 0,
        overwrite: true
      });
    };

    const startAutoRotation = () => {
      if (!autoRotate) return;

      lastUpdateTimeRef.current = Date.now();
      updateRotationFunctionRef.current = updateRotation;
      gsap.ticker.add(updateRotation);

      if (speedTweenRef.current) {
        speedTweenRef.current.kill();
      }

      speedTweenRef.current = gsap.to(speedControllerRef.current, {
        value: targetRotationSpeed,
        duration: carouselConfig.pauseEaseDuration,
        ease: 'power1.out'
      });
    };

    const stopAutoRotation = () => {
      if (speedTweenRef.current) {
        speedTweenRef.current.kill();
      }

      speedTweenRef.current = gsap.to(speedControllerRef.current, {
        value: 0,
        duration: carouselConfig.pauseEaseDuration,
        ease: 'power1.in',
        onComplete: () => {
          if (updateRotationFunctionRef.current) {
            gsap.ticker.remove(updateRotationFunctionRef.current);
            updateRotationFunctionRef.current = null;
          }
        }
      });
    };

    const resumeAutoRotation = () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }

      autoRotateTimeoutRef.current = setTimeout(() => {
        if (carouselConfig.autoRotate) {
          startAutoRotation();
        }
      }, carouselConfig.resumeDelay);
    };

    // Add entrance animation
    if (carouselConfig.entranceAnimation !== 'none') {
      let entranceAnimation: gsap.TweenVars = {};

      switch (carouselConfig.entranceAnimation) {
        case 'fadeIn':
          entranceAnimation = {
            opacity: 0,
            duration: carouselConfig.entranceDuration,
            stagger: carouselConfig.entranceStagger,
            ease: 'power2.out'
          };
          break;
        case 'fadeUp':
          entranceAnimation = {
            y: carouselConfig.entranceDistance,
            opacity: 0,
            duration: carouselConfig.entranceDuration,
            stagger: carouselConfig.entranceStagger,
            ease: 'power3.out'
          };
          break;
      }

      timeline.from('.carousel-slide', entranceAnimation)
        .add(() => {
          startAutoRotation();
        });
    } else {
      startAutoRotation();
    }

    // Hover pause functionality
    const handleMouseEnter = () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
      stopAutoRotation();
    };

    const handleMouseLeave = () => {
      resumeAutoRotation();
    };

    const handleTouchStart = () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
      stopAutoRotation();
    };

    const handleTouchEnd = () => {
      resumeAutoRotation();
    };

    // Add event listeners if pause on hover is enabled
    if (carouselConfig.pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);

      // Cleanup function
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
        
        if (updateRotationFunctionRef.current) {
          gsap.ticker.remove(updateRotationFunctionRef.current);
        }
        if (speedTweenRef.current) {
          speedTweenRef.current.kill();
        }
        if (autoRotateTimeoutRef.current) {
          clearTimeout(autoRotateTimeoutRef.current);
        }
      };
    }

    // Cleanup function for non-hover case
    return () => {
      if (updateRotationFunctionRef.current) {
        gsap.ticker.remove(updateRotationFunctionRef.current);
      }
      if (speedTweenRef.current) {
        speedTweenRef.current.kill();
      }
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
  }, [allSlides, carouselConfig]);

  const CSSstyles = {
  base: {
    perspective: 'var(--perspective)',
    '@media (max-width: 767px)': {
      perspective: 'var(--perspective-m)'
    }
  }
};

  return (
    <div 
      ref={containerRef}
      className={`curved-carousel relative w-full select-none overflow-visible z-10 ${className}`}
      style={carouselStyles}
    >
      {/* Stage */}
      <div 
        ref={stageRef}
        className="curved-carousel__stage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={CSSstyles.base}
      >
        {/* Ring */}
        <div 
          ref={ringRef}
          className="curved-carousel__ring absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            gap: 0
          }}
        >
          {allSlides.map((slide, index) => (
            <div   
            
              key={slide.id}
              className="carousel-slide absolute overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-3xl"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .curved-carousel {
          height: var(--viewport-height);
          margin-block: var(--block-offset);
          transform-style: preserve-3d;
          -webkit-mask-image: var(--fadeout);
          mask-image: var(--fadeout);
        }

        @media (max-width: 767px) {
          .curved-carousel {
            height: var(--viewport-height-m);
            margin-block: var(--block-offset-m);
          }
        }
      `}</style>
    </div>
  );
};



