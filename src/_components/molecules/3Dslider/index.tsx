// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { Draggable } from "gsap/dist/Draggable";
// import type { TeamMember } from "src/_components/sections/types/team.type";

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(Draggable);
// }

// interface CarouselProps {
//   images?: string[];
//   teamMembers?: TeamMember[];
//   containerSize?: number;
//   radius?: number;
//   className?: string;
// }

// const GSAPCarousel: React.FC<CarouselProps> = ({
//   images,
//   teamMembers,
//   containerSize = 300,
//   radius = 500,
//   className = "",
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const ringRef = useRef<HTMLDivElement>(null);
//   const draggerRef = useRef<HTMLDivElement>(null);
//   const imgRefs = useRef<HTMLDivElement[]>([]);
//   const xPos = useRef(0);

//   // Use team member images if provided, otherwise use custom images, fallback to default
//   const getCarouselImages = () => {
//     if (teamMembers && teamMembers.length > 0) {
//       return teamMembers.map((member) => member.src || member.image);
//     }
//     if (images && images.length > 0) {
//       return images;
//     }
//     // Default fallback images
//     return Array.from(
//       { length: 10 },
//       (_, i) => `https://picsum.photos/id/${i + 32}/700/300/`,
//     );
//   };

//   const carouselImages = getCarouselImages();

//   const getBgPos = (i: number): string => {
//     if (!ringRef.current) return "0px 0px";
//     const rotationY = gsap.getProperty(ringRef.current, "rotationY") as number;
//     const angleStep = 360 / carouselImages.length;
//     const bgOffset =
//       (-gsap.utils.wrap(0, 360, rotationY - 180 - i * angleStep) / 360) * 400;
//     return `${bgOffset}px 0px`;
//   };

//   useEffect(() => {
//     if (!containerRef.current || !ringRef.current || !draggerRef.current)
//       return;

//     const ring = ringRef.current;
//     const dragger = draggerRef.current;
//     const imgs = imgRefs.current.filter(Boolean); // Filter out null/undefined refs

//     if (imgs.length === 0) return;

//     // Calculate angle based on number of images
//     const angleStep = 360 / carouselImages.length;

//     // Initial GSAP timeline setup
//     const tl = gsap.timeline();

//     tl.set(dragger, { opacity: 0 }) // make the drag layer invisible
//       .set(ring, { rotationY: 180 }) // set initial rotationY so the parallax jump happens off screen
//       .set(imgs, {
//         // apply transform rotations to each image
//         rotateY: (i) => i * -angleStep,
//         transformOrigin: `50% 50% ${radius}px`,
//         z: -radius,
//         backgroundImage: (i) => `url(${carouselImages[i]})`,
//         backgroundPosition: (i) => getBgPos(i),
//         backgroundSize: "cover",
//         backfaceVisibility: "hidden",
//       })
//       .from(imgs, {
//         duration: 1.5,
//         y: 200,
//         opacity: 0,
//         stagger: 0.1,
//         ease: "expo",
//       });

//     // Setup draggable
//     const draggableInstance = Draggable.create(dragger, {
//       onDragStart: (e: any) => {
//         if (e.touches) e.clientX = e.touches[0].clientX;
//         xPos.current = Math.round(e.clientX);
//       },

//       onDrag: (e: any) => {
//         if (e.touches) e.clientX = e.touches[0].clientX;

//         gsap.to(ring, {
//           rotationY: "-=" + ((Math.round(e.clientX) - xPos.current) % 360),
//           onUpdate: () => {
//             gsap.set(imgs, {
//               backgroundPosition: (i) => getBgPos(i),
//             });
//           },
//         });

//         xPos.current = Math.round(e.clientX);
//       },

//       onDragEnd: () => {
//         gsap.set(dragger, { x: 0, y: 0 }); // reset drag layer
//       },
//     });

//     // Cleanup function
//     return () => {
//       if (draggableInstance && draggableInstance[0]) {
//         draggableInstance[0].kill();
//       }
//       tl.kill();
//     };
//   }, [carouselImages, radius]);

//   return (
//     <div className="gsap-carousel-wrapper">
//       <style jsx>{`
//         .gsap-carousel-wrapper {
//           width: 100%;
//           height: 50vh;
//           overflow: hidden;
//           position: relative;
//           background: green;
//         }

//         .carousel-container {
//           perspective: 2000px;
//           width: ${containerSize}px;
//           height: ${containerSize}px;
//           position: absolute;
//           left: 50%;
//           top: 50%;
//           transform: translate(-50%, -50%);
//         }

//         .carousel-ring,
//         .carousel-img,
//         .carousel-dragger {
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           user-select: none;
//         }

//         .carousel-ring,
//         .carousel-img,
//         .carousel-dragger {
//           position: absolute;
//         }

//         .carousel-img {
//           background-size: contain;
//           background-repeat: no-repeat;
//         }
//       `}</style>

//       <div className="carousel-container" ref={containerRef}>
//         <div className="carousel-ring" ref={ringRef}>
//           {carouselImages.map((_, index) => (
//             <div
//               key={index}
//               className="carousel-img"
//               ref={(el) => {
//                 if (el) imgRefs.current[index] = el;
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="carousel-vignette" />
//       <div className="carousel-dragger" ref={draggerRef} />
//     </div>
//   );
// };

// export default GSAPCarousel;









import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import type { TeamMember } from "src/_components/sections/types/team.type";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface CarouselProps {
  images?: string[];
  teamMembers?: TeamMember[];
  containerSize?: number;
  radius?: number;
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  pauseOnHover?: boolean;
}

const GSAPCarousel: React.FC<CarouselProps> = ({
  images,
  teamMembers,
  containerSize = 300,
  radius = 500,
  className = "",
  autoRotate = true,
  autoRotateSpeed = 1, // Speed multiplier for auto rotation
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const draggerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const xPos = useRef(0);
  const autoRotateRef = useRef<GSAPTimeline | null>(null);
  const isDragging = useRef(false);
  const isHovering = useRef(false);

  // Use team member images if provided, otherwise use custom images, fallback to default
  const getCarouselImages = () => {
    if (teamMembers && teamMembers.length > 0) {
      return teamMembers.map((member) => member.src || member.image);
    }
    if (images && images.length > 0) {
      return images;
    }
    // Default fallback images
    return Array.from(
      { length: 10 },
      (_, i) => `https://picsum.photos/id/${i + 32}/700/300/`,
    );
  };

  const carouselImages = getCarouselImages();

  const getBgPos = (i: number): string => {
    if (!ringRef.current) return "0px 0px";
    const rotationY = gsap.getProperty(ringRef.current, "rotationY") as number;
    const angleStep = 360 / carouselImages.length;
    const bgOffset =
      (-gsap.utils.wrap(0, 360, rotationY - 180 - i * angleStep) / 360) * 400;
    return `${bgOffset}px 0px`;
  };

  // Start auto rotation
  const startAutoRotation = () => {
    if (!autoRotate || !ringRef.current || autoRotateRef.current) return;
    
    const imgs = imgRefs.current.filter(Boolean);
    
    autoRotateRef.current = gsap.timeline({ repeat: -1 });
    autoRotateRef.current.to(ringRef.current, {
      rotationY: "+=360",
      duration: 20 / autoRotateSpeed, // Adjust duration based on speed
      ease: "none",
      onUpdate: () => {
        gsap.set(imgs, {
          backgroundPosition: (i) => getBgPos(i),
        });
      },
    });
  };

  // Stop auto rotation
  const stopAutoRotation = () => {
    if (autoRotateRef.current) {
      autoRotateRef.current.kill();
      autoRotateRef.current = null;
    }
  };

  // Resume auto rotation if conditions are met
  const resumeAutoRotation = () => {
    if (autoRotate && !isDragging.current && (!pauseOnHover || !isHovering.current)) {
      startAutoRotation();
    }
  };

  // Handle mouse enter/leave for hover pause
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isHovering.current = true;
      stopAutoRotation();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isHovering.current = false;
      resumeAutoRotation();
    }
  };

  useEffect(() => {
    if (!containerRef.current || !ringRef.current || !draggerRef.current)
      return;

    const ring = ringRef.current;
    const dragger = draggerRef.current;
    const container = containerRef.current;
    const imgs = imgRefs.current.filter(Boolean); // Filter out null/undefined refs

    if (imgs.length === 0) return;

    // Calculate angle based on number of images
    const angleStep = 360 / carouselImages.length;

    // Initial GSAP timeline setup
    const tl = gsap.timeline({
      onComplete: () => {
        // Start auto rotation after initial animation completes
        startAutoRotation();
      },
    });

    tl.set(dragger, { opacity: 0 }) // make the drag layer invisible
      .set(ring, { rotationY: 180 }) // set initial rotationY so the parallax jump happens off screen
      .set(imgs, {
        // apply transform rotations to each image
        rotateY: (i) => i * -angleStep,
        transformOrigin: `50% 50% ${radius}px`,
        z: -radius,
        backgroundImage: (i) => `url(${carouselImages[i]})`,
        backgroundPosition: (i) => getBgPos(i),
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
      })
      .from(imgs, {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: "expo",
      });

    // Setup draggable
    const draggableInstance = Draggable.create(dragger, {
      onDragStart: (e: any) => {
        isDragging.current = true;
        stopAutoRotation();
        
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos.current = Math.round(e.clientX);
      },

      onDrag: (e: any) => {
        if (e.touches) e.clientX = e.touches[0].clientX;

        gsap.to(ring, {
          rotationY: "-=" + ((Math.round(e.clientX) - xPos.current) % 360),
          onUpdate: () => {
            gsap.set(imgs, {
              backgroundPosition: (i) => getBgPos(i),
            });
          },
        });

        xPos.current = Math.round(e.clientX);
      },

      onDragEnd: () => {
        isDragging.current = false;
        gsap.set(dragger, { x: 0, y: 0 }); // reset drag layer
        
        // Resume auto rotation after a brief delay
        setTimeout(() => {
          resumeAutoRotation();
        }, 1000);
      },
    });

    // Add hover event listeners
    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup function
    return () => {
      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }
      tl.kill();
      stopAutoRotation();
      
      if (pauseOnHover && container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [carouselImages, radius, autoRotate, autoRotateSpeed, pauseOnHover]);

  return (
    <div className="gsap-carousel-wrapper">
      <style jsx>{`
        .gsap-carousel-wrapper {
          width: 100%;
          height: 50vh;
          overflow: hidden;
          position: relative;
          background: green;
        }

        .carousel-container {
          perspective: 2000px;
          width: ${containerSize}px;
          height: ${containerSize}px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .carousel-ring,
        .carousel-img,
        .carousel-dragger {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          user-select: none;
        }

        .carousel-ring,
        .carousel-img,
        .carousel-dragger {
          position: absolute;
        }

        .carousel-img {
          background-size: contain;
          background-repeat: no-repeat;
          cursor: pointer;
        }
      `}</style>

      <div className="carousel-container" ref={containerRef}>
        <div className="carousel-ring" ref={ringRef}>
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className="carousel-img"
              ref={(el) => {
                if (el) imgRefs.current[index] = el;
              }}
              onMouseEnter={() => {
                isHovering.current = true;
                stopAutoRotation();
              }}
              onMouseLeave={() => {
                isHovering.current = false;
                resumeAutoRotation();
              }}
            />
          ))}
        </div>
      </div>

      <div className="carousel-vignette" />
      <div className="carousel-dragger" ref={draggerRef} />
    </div>
  );
};

export default GSAPCarousel;