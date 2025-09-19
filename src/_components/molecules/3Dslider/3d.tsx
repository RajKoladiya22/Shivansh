// import React, { useState, useRef, useEffect } from 'react';
// import './inswx.css'

// interface TiltProps {
//   animationDuration?: string;
// }

// interface SlideProps {
//   image: string;
//   title?: string;
//   subtitle?: string;
//   description?: string;
//   offset?: number;
//   isPageBackground?: boolean;
// }

// interface CarouselProps {
//   slides: Array<SlideProps | string>;
//   isPageBackground?: boolean;
//   autoRotate?: boolean;
//   rotationInterval?: number;
// }

// function useTilt({ animationDuration = '150ms' }: TiltProps = {}) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) {
//       return;
//     }

//     const unify = (e: MouseEvent | TouchEvent): MouseEvent | Touch => {
//       if ('changedTouches' in e && e.changedTouches && e.changedTouches.length > 0) {
//         return e.changedTouches[0] ?? (e as unknown as MouseEvent);
//       }
//       return e as MouseEvent;
//     };

//     const state: {
//       rect?: DOMRect;
//       mouseX?: number;
//       mouseY?: number;
//     } = {};

//     const el = ref.current;

//     const handleEnterEvent = () => {
//       el.style.transition = `transform ${animationDuration} ease-out`;
//     };

//     const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
//       e.preventDefault();

//       if (!el) {
//         return;
//       }
      
//       if (!state.rect) {
//         state.rect = el.getBoundingClientRect();
//       }
      
//       const unifiedEvent = unify(e);
//       state.mouseX = unifiedEvent.clientX;
//       state.mouseY = unifiedEvent.clientY;

//       const px = (state.mouseX - state.rect.left) / state.rect.width;
//       const py = (state.mouseY - state.rect.top) / state.rect.height;

//       el.style.setProperty('--px', px.toFixed(2));
//       el.style.setProperty('--py', py.toFixed(2));
//     };

//     const handleEndEvent = () => {
//       el.style.setProperty('--px', '0.5');
//       el.style.setProperty('--py', '0.5');
//       el.style.transition = `transform ${animationDuration} ease-in`;
//     };

//     el.addEventListener('mouseenter', handleEnterEvent);
//     el.addEventListener('mousemove', handleMoveEvent as EventListener);
//     el.addEventListener('mouseleave', handleEndEvent);
//     el.addEventListener('touchstart', handleEnterEvent as EventListener);
//     el.addEventListener('touchmove', handleMoveEvent as EventListener);
//     el.addEventListener('touchend', handleEndEvent);

//     return () => {
//       el.removeEventListener('mouseenter', handleEnterEvent);
//       el.removeEventListener('mousemove', handleMoveEvent as EventListener);
//       el.removeEventListener('mouseleave', handleEndEvent);
//       el.removeEventListener('touchstart', handleEnterEvent as EventListener);
//       el.removeEventListener('touchmove', handleMoveEvent as EventListener);
//       el.removeEventListener('touchend', handleEndEvent);
//     };
//   }, [animationDuration]);

//   return ref;
// }

// const Slide: React.FC<SlideProps> = ({ 
//   image, 
//   title, 
//   subtitle, 
//   description, 
//   offset, 
//   isPageBackground 
// }) => {
//   const active = offset === 0;
//   const ref = useTilt(active ? { animationDuration: '150ms' } : undefined);

//   return (
//     <div
//       ref={ref}
//       className="slide"
//       data-active={active || undefined}
//       style={{
//         '--offset': offset,
//         '--dir': (offset ?? 0) === 0 ? 0 : (offset ?? 0) > 0 ? 1 : -1,
//       } as React.CSSProperties}
//     >
//       {/* {isPageBackground && (
//         <div
//           className="slideBackground"
//           style={{
//             backgroundImage: `url('${image}')`,
//           }}
//         />
//       )} */}
//       <div
//         className="slideContent"
//         style={{
//           backgroundImage: `url('${image}')`,
//         }}
//       >
//         <div className="slideContentInner">
//           {title && (
//             <h2 className="slideTitle" dir="auto">
//               {title}
//             </h2>
//           )}
//           {subtitle && (
//             <h3 className="slideSubtitle" dir="auto">
//               {subtitle}
//             </h3>
//           )}
//           {description && (
//             <p className="slideDescription" dir="auto">
//               {description}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Carousel: React.FC<CarouselProps> = ({ 
//   slides, 
//   isPageBackground, 
//   autoRotate = true, 
//   rotationInterval = 5000 
// }) => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const handlePrevSlide = () => {
//     setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const handleNextSlide = () => {
//     setSlideIndex((prev) => (prev + 1) % slides.length);
//   };

//   // Auto-rotation effect
//   useEffect(() => {
//     if (!autoRotate || isPaused) return;

//     intervalRef.current = setInterval(() => {
//       handleNextSlide();
//     }, rotationInterval);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [autoRotate, isPaused, rotationInterval, slides.length]);

//   const handleMouseEnter = () => {
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   return (
//     <section 
//       className="slidesWrapper" 
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="slides">
//         <button className="prevSlideBtn" onClick={handlePrevSlide}>
//           <i className="fas fa-chevron-left" />
//         </button>

//         {[...slides, ...slides, ...slides].map((slide, i) => {
//           let offset = slides.length + (slideIndex - i);

//           if (typeof slide === 'string') {
//             return (
//               <Slide 
//                 image={slide} 
//                 offset={offset} 
//                 isPageBackground={isPageBackground} 
//                 key={i} 
//               />
//             );
//           } else {
//             return (
//               <Slide
//                 image={slide.image}
//                 title={slide.title}
//                 subtitle={slide.subtitle}
//                 description={slide.description}
//                 offset={offset}
//                 isPageBackground={isPageBackground}
//                 key={i}
//               />
//             );
//           }
//         })}
//         <button className="nextSlideBtn" onClick={handleNextSlide}>
//           <i className="fas fa-chevron-right" />
//         </button>
//       </div>
//     </section>
//   );
// };

// // Example usage with auto-rotation
// const slides = [
//   {
//     id: 1,
//     title: 'First',
//     subtitle: 'slide',
//     description: 'Praesent ac sem eget est.',
//     image: 'https://picsum.photos/id/1/500/500',
//   },
//   {
//     id: 2,
//     title: 'Second',
//     subtitle: 'slide',
//     description: 'Praesent ac sem eget est.',
//     image: 'https://picsum.photos/id/234/500/500',
//   },
//   {
//     id: 3,
//     title: 'Third',
//     subtitle: 'slide',
//     description: 'Praesent ac sem eget est.',
//     image: 'https://picsum.photos/id/790/500/500',
//   },
// ];

// const App = () => (
//   <Carousel 
//     slides={slides} 
//     isPageBackground 
//     autoRotate={true}
//     rotationInterval={3000} 
//   />
// );

// export default App;