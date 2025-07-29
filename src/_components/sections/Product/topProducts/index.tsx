// import React, { useState, useEffect } from 'react';
// import { Star, Play, TrendingUp, Eye, ChevronRight } from 'lucide-react';
// import { sampleProducts } from '..';



// // Compact Product Card for Widget
// const CompactProductCard = ({ product, rank, onVideoPlay, onViewProduct }) => {
//   const discountPercentage = Math.round(((product.actualPrice - product.salePrice) / product.actualPrice) * 100);

//   return (
//     <div className="flex gap-3 p-3 bg-white hover:bg-[#FCF2F2] transition-colors duration-300 rounded-lg border border-gray-100 hover:border-[#C50202] hover:shadow-md group">
//       {/* Rank Badge */}
//       <div className="flex-shrink-0">
//         <div className="w-8 h-8 bg-[#C50202] text-white rounded-full flex items-center justify-center text-sm font-bold">
//           {rank}
//         </div>
//       </div>

//       {/* Product Image with Video Overlay */}
//       <div className="relative flex-shrink-0">
//         <img 
//           src={product.image} 
//           alt={product.title}
//           className="w-16 h-16 object-cover rounded-lg"
//         />
//         <button
//           onClick={() => onVideoPlay(product.videoId)}
//           className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg"
//         >
//           <Play className="w-4 h-4 text-white" />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="flex-1 min-w-0">
//         <h4 className="font-semibold text-sm text-gray-800 line-clamp-1 mb-1">
//           {product.title}
//         </h4>
//         <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//           {product.description}
//         </p>
        
//         {/* Price and Rating Row */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-bold text-[#C50202]">
//               ₹{product.salePrice.toLocaleString()}
//             </span>
//             {discountPercentage > 0 && (
//               <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded">
//                 {discountPercentage}% OFF
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Stats Row */}
//         <div className="flex items-center justify-between text-xs text-gray-500">
//           <div className="flex items-center gap-1">
//             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//             <span>{product.rating}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Eye className="w-3 h-3" />
//             <span>{product.views}</span>
//           </div>
//         </div>
//       </div>

//       {/* View Button */}
//       <div className="flex-shrink-0 flex items-center">
//         <button
//           onClick={() => onViewProduct(product.id)}
//           className="p-1 text-[#C50202] hover:bg-[#C50202] hover:text-white rounded-full transition-colors duration-200"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Widget Component
// export const TopProductsWidget = ({ 
//   maxProducts = 5, 
//   showHeader = true, 
//   showViewAll = true,
//   onVideoPlay,
//   onViewProduct,
//   onViewAll,
//   className = "" 
// }) => {
//   const [topProducts, setTopProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call
//     const loadTopProducts = async () => {
//       setIsLoading(true);
//       // Sort by views and rating to get actual top products
//       const sortedProducts = sampleProducts
//         .sort((a, b) => (b.views * b.rating) - (a.views * a.rating))
//         .slice(0, maxProducts);
      
//       setTimeout(() => {
//         setTopProducts(sortedProducts);
//         setIsLoading(false);
//       }, 500);
//     };

//     loadTopProducts();
//   }, [maxProducts]);

//   if (isLoading) {
//     return (
//       <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded mb-4"></div>
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="flex gap-3 mb-3">
//               <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//               <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-3 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
//       {/* Widget Header */}
//       {showHeader && (
//         <div className="bg-gradient-to-r from-[#C50202] to-[#C5020280] p-4">
//           <div className="flex items-center gap-2 text-white">
//             <TrendingUp className="w-5 h-5" />
//             <h3 className="font-bold text-lg">Top Products</h3>
//           </div>
//           <p className="text-white/80 text-sm mt-1">Most popular products this month</p>
//         </div>
//       )}

//       {/* Products List */}
//       <div className="p-4">
//         <div className="space-y-3">
//           {topProducts.map((product, index) => (
//             <CompactProductCard
//               key={product.id}
//               product={product}
//               rank={index + 1}
//               onVideoPlay={onVideoPlay}
//               onViewProduct={onViewProduct}
//             />
//           ))}
//         </div>

//         {/* View All Button */}
//         {showViewAll && (
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button
//               onClick={onViewAll}
//               className="w-full bg-[#C50202] text-white py-2 px-4 rounded-lg hover:bg-[#C5020280] transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
//             >
//               View All Top Products
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Stats Footer */}
//       <div className="bg-[#EEF6FF] px-4 py-3 border-t">
//         <div className="flex justify-between text-xs text-gray-600">
//           <span>Updated: Just now</span>
//           {/* <span>{topProducts.length} of {topProductsData.length} products</span> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Video Modal Component
// const VideoModal = ({ videoId, onClose }) => {
//   if (!videoId) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[70vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100"
//         >
//           ×
//         </button>
//         <div className="aspect-video">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//             className="w-full h-full rounded-lg"
//             allowFullScreen
//             allow="autoplay"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Example Usage Component
// const TopProductsWidgetDemo = () => {
//   const [currentVideo, setCurrentVideo] = useState(null);

//   const handleVideoPlay = (videoId) => {
//     setCurrentVideo(videoId);
//   };

//   const handleViewProduct = (productId) => {
//     console.log('View product:', productId);
//     // Navigate to product detail page
//   };

//   const handleViewAll = () => {
//     console.log('View all top products');
//     // Navigate to top products page
//   };

//   return (
//     <div className="min-h-screen bg-[#EEF6FF] p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Top Products Widget Demo</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content Area */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-8">
//               <h2 className="text-xl font-semibold mb-4">Main Content Area</h2>
//               <p className="text-gray-600 mb-4">
//                 This is where your main content would go. The Top Products Widget 
//                 can be placed in the sidebar to complement your main content.
//               </p>
//               <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
//                 <span className="text-gray-500">Your main content here</span>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar with Top Products Widget */}
//           <div className="lg:col-span-1">
//             <TopProductsWidget
//               maxProducts={5}
//               showHeader={true}
//               showViewAll={true}
//               onVideoPlay={handleVideoPlay}
//               onViewProduct={handleViewProduct}
//               onViewAll={handleViewAll}
//               className="sticky top-4"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Video Modal */}
//       <VideoModal 
//         videoId={currentVideo} 
//         onClose={() => setCurrentVideo(null)} 
//       />
//     </div>
//   );
// };

// export default TopProductsWidgetDemo;