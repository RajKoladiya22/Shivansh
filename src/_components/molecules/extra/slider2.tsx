// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import type { ReactNode } from 'react';
// import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// interface ResponsiveConfig {
//   mobile?: number;
//   tablet?: number;
//   desktop?: number;
//   [key: string]: number | undefined;
// }

// interface SliderProps {
//   // Core data
//   items: any[];

//   // Layout configuration
//   layout?: 'row' | 'column' | 'grid';
//   itemsPerSlide?: number | ResponsiveConfig;
//   rows?: number;
//   columns?: number;

//   // Auto-play configuration
//   autoPlay?: boolean;
//   autoPlayInterval?: number;
//   pauseOnHover?: boolean;

//   // Controls configuration
//   showArrows?: boolean;
//   showDots?: boolean;
//   showPlayPause?: boolean;
//   arrowPosition?: 'inside' | 'outside';

//   // Responsive breakpoints
//   breakpoints?: {
//     mobile: number;
//     tablet: number;
//     desktop: number;
//   };

//   // Styling
//   className?: string;
//   slideClassName?: string;
//   gap?: string;

//   // Render function
//   renderItem: (item: any, index: number) => ReactNode;

//   // Event handlers
//   onSlideChange?: (currentSlide: number) => void;
//   onItemClick?: (item: any, index: number) => void;
// }

// export const ReusableSlider: React.FC<SliderProps> = ({
//   items,
//   layout = 'row',
//   itemsPerSlide = 1,
//   rows = 1,
//   columns = 1,
//   autoPlay = false,
//   autoPlayInterval = 5000,
//   pauseOnHover = true,
//   showArrows = true,
//   showDots = true,
//   showPlayPause = false,
//   arrowPosition = 'outside',
//   breakpoints = { mobile: 768, tablet: 1024, desktop: 1280 },
//   className = '',
//   slideClassName = '',
//   gap = '1rem',
//   renderItem,
//   onSlideChange,
//   onItemClick
// }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(1);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   // Calculate items per slide based on responsive config
//   const calculateItemsPerSlide = () => {
//     if (typeof itemsPerSlide === 'number') {
//       return itemsPerSlide;
//     }

//     const width = window.innerWidth;
//     if (width < breakpoints.mobile) {
//       return itemsPerSlide.mobile || 1;
//     } else if (width < breakpoints.tablet) {
//       return itemsPerSlide.tablet || 2;
//     } else {
//       return itemsPerSlide.desktop || 3;
//     }
//   };

//   // Update items per slide on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setCurrentItemsPerSlide(calculateItemsPerSlide());
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [itemsPerSlide, breakpoints]);

//   // Calculate total slides
//   const totalSlides = Math.ceil(items.length / (layout === 'grid' ? rows * columns : currentItemsPerSlide));

//   // Auto-play functionality
//   useEffect(() => {
//     if (isPlaying && autoPlay) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % totalSlides);
//       }, autoPlayInterval);
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPlaying, autoPlay, autoPlayInterval, totalSlides]);

//   // Handle slide change
//   const handleSlideChange = (newSlide: number) => {
//     setCurrentSlide(newSlide);
//     onSlideChange?.(newSlide);
//   };

//   // Navigation functions
//   const nextSlide = () => {
//     const newSlide = (currentSlide + 1) % totalSlides;
//     handleSlideChange(newSlide);
//   };

//   const prevSlide = () => {
//     const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//     handleSlideChange(newSlide);
//   };

//   const goToSlide = (index: number) => {
//     handleSlideChange(index);
//   };

//   // Play/Pause controls
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Mouse event handlers
//   const handleMouseEnter = () => {
//     if (pauseOnHover) {
//       setIsPlaying(false);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (pauseOnHover && autoPlay) {
//       setIsPlaying(true);
//     }
//   };

//   // Get current slide items
//   const getCurrentItems = () => {
//     const itemsPerCurrentSlide = layout === 'grid' ? rows * columns : currentItemsPerSlide;
//     const startIndex = currentSlide * itemsPerCurrentSlide;
//     return items.slice(startIndex, startIndex + itemsPerCurrentSlide);
//   };

//   // Get grid classes based on layout
//   const getGridClasses = () => {
//     if (layout === 'grid') {
//       return `grid grid-cols-${columns} grid-rows-${rows}`;
//     } else if (layout === 'column') {
//       return `flex flex-col`;
//     } else {
//       return `grid grid-cols-${currentItemsPerSlide}`;
//     }
//   };

//   return (
//     <div
//       ref={sliderRef}
//       className={`relative ${className}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Main slider container */}
//       <div className="relative overflow-hidden">
//         {/* Items container */}
//         <div
//           className={`${getGridClasses()} ${slideClassName}`}
//           style={{ gap }}
//         >
//           {getCurrentItems().map((item, index) => (
//             <div
//               key={currentSlide * (layout === 'grid' ? rows * columns : currentItemsPerSlide) + index}
//               className="flex-shrink-0 cursor-pointer"
//               onClick={() => onItemClick?.(item, index)}
//             >
//               {renderItem(item, index)}
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         {showArrows && totalSlides > 1 && (
//           <>
//             <button
//               onClick={prevSlide}
//               className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:scale-110 ${
//                 arrowPosition === 'inside' ? 'left-4' : '-left-12'
//               }`}
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-6 w-6 text-gray-600" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className={`absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:scale-110 ${
//                 arrowPosition === 'inside' ? 'right-4' : '-right-12'
//               }`}
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-6 w-6 text-gray-600" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Bottom controls */}
//       {(showDots || showPlayPause) && (
//         <div className="flex items-center justify-center gap-4 mt-6">
//           {/* Play/Pause Button */}
//           {showPlayPause && autoPlay && (
//             <button
//               onClick={togglePlayPause}
//               className="flex items-center justify-center rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50"
//               aria-label={isPlaying ? 'Pause' : 'Play'}
//             >
//               {isPlaying ? (
//                 <Pause className="h-5 w-5 text-gray-600" />
//               ) : (
//                 <Play className="h-5 w-5 text-gray-600" />
//               )}
//             </button>
//           )}

//           {/* Dots Navigation */}
//           {showDots && totalSlides > 1 && (
//             <div className="flex space-x-2">
//               {Array.from({ length: totalSlides }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`h-3 w-3 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? 'w-8 bg-blue-500'
//                       : 'bg-gray-300 hover:bg-gray-400'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Auto-play indicator */}
//       {autoPlay && (
//         <div className="absolute top-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-3 py-1 text-white text-xs">
//           <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-gray-400'}`} />
//           <span>{isPlaying ? 'Auto-playing' : 'Paused'}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Example usage components
// const ExampleCard = ({ item }: { item: any }) => (
//   <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
//     <h3 className="font-bold text-lg mb-2">{item.title}</h3>
//     <p className="text-gray-600">{item.description}</p>
//   </div>
// );

// const ExampleTestimonial = ({ item }: { item: any }) => (
//   <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
//     <div className="flex items-center mb-4">
//       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold">
//         {item.name?.charAt(0) || 'U'}
//       </div>
//       <div className="ml-4">
//         <h4 className="font-semibold">{item.name}</h4>
//         <p className="text-sm opacity-90">{item.role}</p>
//       </div>
//     </div>
//     <p className="italic">"{item.quote}"</p>
//   </div>
// );

// // Demo component showing different use cases
// export const SliderDemo = () => {
//   const sampleItems = [
//     { id: 1, title: 'Item 1', description: 'This is the first item' },
//     { id: 2, title: 'Item 2', description: 'This is the second item' },
//     { id: 3, title: 'Item 3', description: 'This is the third item' },
//     { id: 4, title: 'Item 4', description: 'This is the fourth item' },
//     { id: 5, title: 'Item 5', description: 'This is the fifth item' },
//     { id: 6, title: 'Item 6', description: 'This is the sixth item' },
//   ];

//   const testimonials = [
//     { id: 1, name: 'John Doe', role: 'CEO', quote: 'This product changed our business completely!' },
//     { id: 2, name: 'Jane Smith', role: 'Designer', quote: 'Amazing user experience and design!' },
//     { id: 3, name: 'Bob Johnson', role: 'Developer', quote: 'The best tool I have ever used!' },
//     { id: 4, name: 'Alice Brown', role: 'Manager', quote: 'Highly recommend to everyone!' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto space-y-12">

//         {/* Basic Row Layout */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Basic Row Layout</h2>
//           <ReusableSlider
//             items={sampleItems}
//             layout="row"
//             itemsPerSlide={{ mobile: 1, tablet: 2, desktop: 3 }}
//             autoPlay={true}
//             autoPlayInterval={3000}
//             showArrows={true}
//             showDots={true}
//             renderItem={(item) => <ExampleCard item={item} />}
//             className="bg-white rounded-lg p-6 shadow-lg"
//           />
//         </section>

//         {/* Grid Layout */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Grid Layout (2x2)</h2>
//           <ReusableSlider
//             items={sampleItems}
//             layout="grid"
//             rows={2}
//             columns={2}
//             autoPlay={true}
//             autoPlayInterval={4000}
//             showArrows={true}
//             showDots={true}
//             showPlayPause={true}
//             renderItem={(item) => <ExampleCard item={item} />}
//             className="bg-white rounded-lg p-6 shadow-lg"
//           />
//         </section>

//         {/* Testimonials Column Layout */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Testimonials Column Layout</h2>
//           <ReusableSlider
//             items={testimonials}
//             layout="column"
//             itemsPerSlide={2}
//             autoPlay={true}
//             autoPlayInterval={5000}
//             pauseOnHover={true}
//             showArrows={true}
//             showDots={true}
//             arrowPosition="inside"
//             renderItem={(item) => <ExampleTestimonial item={item} />}
//             className="bg-gray-800 rounded-lg p-6 shadow-lg"
//             gap="1.5rem"
//           />
//         </section>

//         {/* Manual Control Only */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Manual Control Only</h2>
//           <ReusableSlider
//             items={sampleItems}
//             layout="row"
//             itemsPerSlide={1}
//             autoPlay={false}
//             showArrows={true}
//             showDots={true}
//             renderItem={(item) => <ExampleCard item={item} />}
//             className="bg-white rounded-lg p-6 shadow-lg"
//             onSlideChange={(slide) => console.log('Slide changed to:', slide)}
//             onItemClick={(item) => console.log('Item clicked:', item)}
//           />
//         </section>

//       </div>
//     </div>
//   );
// };

{
  /* <ReusableSlider
            items={testimonials}
            renderItem={(t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
              />
            )}
            layout="row"
            rows={2}
            columns={2}
            autoPlay={true}
            arrowPosition="outside"
            
          /> */
}
