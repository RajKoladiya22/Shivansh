import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Member = { id: number; name: string; position: string; image: string };

export default function Simple3DCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rotationRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const [translateZ, setTranslateZ] = useState(800); // computed radius

  const teamMembers: Member[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Design Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Marketing Head",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Anna Martinez",
      position: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 8,
      name: "Robert Taylor",
      position: "DevOps Engineer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 9,
      name: "Sophie Brown",
      position: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 10,
      name: "Alex Thompson",
      position: "Sales Director",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 11,
      name: "Maya Patel",
      position: "HR Manager",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 12,
      name: "Chris Lee",
      position: "Backend Developer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 13,
      name: "James Wilson",
      position: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 14,
      name: "Anna Martinez",
      position: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
    },
  ];

  const slideCount = teamMembers.length;
  const anglePerSlide = 360 / slideCount;

  // Auto rotate when not hovered
  useEffect(() => {
    const loop = () => {
      if (!isHovered && ringRef.current) {
        rotationRef.current += 0.28; // slower
        ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered]);

  // Compute radius based on slide width so images look good from center
  useLayoutEffect(() => {
    const computeRadius = () => {
      const container = carouselRef.current;
      const firstSlide =
        container?.querySelector<HTMLDivElement>(".carousel-slide");
      const slideW = firstSlide
        ? firstSlide.getBoundingClientRect().width
        : 180;
      // radius so that slides don't overlap: (slideWidth/2) / tan(pi / n)
      const base = slideW / 2 / Math.tan(Math.PI / slideCount);
      const spacing = 1.08; // leave small gap
      const computed = Math.max(300, base * spacing);
      setTranslateZ(Math.round(computed));
    };

    computeRadius();
    window.addEventListener("resize", computeRadius);
    return () => window.removeEventListener("resize", computeRadius);
  }, [slideCount]);

  // Hover handlers
  const onCarouselEnter = () => setIsHovered(true);
  const onCarouselLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  const onSlideEnter = (i: number) => setHoveredIndex(i);
  const onSlideLeave = () => setHoveredIndex(null);

  return (
    <div className="root bg-gradient flex min-h-screen items-center justify-center">
      <div className="wrap mx-auto w-full max-w-7xl p-6">
        <div
          ref={carouselRef}
          className="carousel-container relative mx-auto"
          onMouseEnter={onCarouselEnter}
          onMouseLeave={onCarouselLeave}
          style={{ perspective: 1400 }}
        >
          <div
            ref={ringRef}
            className="carousel-ring relative w-full"
            style={{
              transformStyle: "preserve-3d",
              transition: isHovered ? "transform 0.5s" : "none",
            }}
          >
            {teamMembers.map((m, i) => {
              const rotateY = i * anglePerSlide;
              // lift hovered slide for emphasis
              const lift = hoveredIndex === i ? 70 : 0;
              const scale = hoveredIndex === i ? 1.06 : 1;
              const baseTransform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
              const finalTransform = `rotateY(${rotateY}deg) translateZ(${translateZ + lift}px) scale(${scale})`;

              return (
                <div
                  key={`slide-${m.id}-${i}`}
                  className="carousel-slide absolute"
                  onMouseEnter={() => onSlideEnter(i)}
                  onMouseLeave={onSlideLeave}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: finalTransform,
                    transformStyle: "preserve-3d",
                    width: "200px",
                    height: "250px",
                    // marginLeft: "-75px",
                    // marginTop: "-100px",
                    transition: "transform 300ms ease",
                    zIndex: hoveredIndex === i ? 40 : 20,
                  }}
                >
                  {/* rotate inner face 180deg so the image faces the center */}
                  <div
                    //   h-[340px] sm:h-[380px] md:h-[420px] lg:h-[480px]
                    className="slide-inner group relative h-full w-full cursor-pointer"
                    style={{
                      transform: "rotateY(180deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="slide-img h-full w-full rounded-xl object-cover shadow-lg transition-transform duration-300"
                      style={{ backfaceVisibility: "hidden" }}
                    />

                    <div
                      className={`overlay absolute inset-0 flex flex-col justify-end rounded-xl p-3 transition-opacity duration-300 ${
                        isHovered || hoveredIndex === i ? "overlay-visible" : ""
                      }`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                      <p className="text-xs text-white/90">{m.position}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`

        .title {
          font-weight: 700;
        }

        .carousel-container {
          height: 340px;
        }

        .carousel-slide {
          will-change: transform;
          pointer-events: auto;
        }

        /* responsive slide sizes, keep matching values used in JS default measurement */
        .carousel-slide {
          width: 150px;
          height: 200px;
          margin-left: -75px;
          margin-top: -100px;
        }
        .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .overlay {
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.78),
            rgba(0, 0, 0, 0.35) 40%,
            transparent
          );
          opacity: 0;
          border-radius: 12px;
        }
        .overlay-visible {
          opacity: 1;
        }

        @media (min-width: 481px) {
          .carousel-container {
            height: 380px;
          }
          .carousel-slide {
            width: 180px;
            height: 240px;
            margin-left: -90px;
            margin-top: -120px;
          }
        }

        @media (min-width: 769px) {
          .carousel-container {
            height: 420px;
          }
          .carousel-slide {
            width: 220px;
            height: 280px;
            margin-left: -110px;
            margin-top: -140px;
          }
        }

        @media (min-width: 1025px) {
          .carousel-container {
            height: 480px;
          }
          .carousel-slide {
            width: 250px;
            height: 320px;
            margin-left: -125px;
            margin-top: -160px;
          }
        }

        @media (min-width: 1441px) {
          .carousel-container {
            height: 520px;
          }
          .carousel-slide {
            width: 300px;
            height: 360px;
            margin-left: -150px;
            margin-top: -180px;
          }
        }

        /* small polish */
        .carousel-ring {
          transition: transform 600ms cubic-bezier(0.2, 0.9, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
