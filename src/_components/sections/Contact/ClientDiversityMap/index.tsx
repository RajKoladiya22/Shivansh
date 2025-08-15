// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   ZoomableGroup,
// } from "react-simple-maps";
// import type { Feature, Geometry, GeoJsonProperties } from 'geojson';

// import {
//   MapPin,
//   Users,
//   Globe,
//   TrendingUp,
//   Building2,
//   X,
//   ZoomIn,
//   ZoomOut,
//   Move,
//   Award,
// } from "lucide-react";

// interface ClientLocation {
//   code: string;
//   name: string;
//   clients: number;
//   cities: string[];
//   mainCity: string;
//   industries: string[];
//   growth: string;
//   revenue: string;
//   projects: number;
// }

// const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
// const clientData: ClientLocation[] = [
//   {
//     code: "IN-MH",
//     name: "Maharashtra",
//     clients: 387,
//     cities: ["Mumbai", "Pune", "Nagpur"],
//     mainCity: "Mumbai",
//     industries: ["Finance", "Technology", "Entertainment", "Manufacturing"],
//     growth: "+28%",
//     revenue: "₹45.2Cr",
//     projects: 156,
//   },
//   {
//     code: "IN-DL",
//     name: "Delhi",
//     clients: 242,
//     cities: ["New Delhi"],
//     mainCity: "New Delhi",
//     industries: ["Government", "IT", "Media"],
//     growth: "+15%",
//     revenue: "₹30.1Cr",
//     projects: 98,
//   },
//   {
//     code: "IN-KA",
//     name: "Karnataka",
//     clients: 319,
//     cities: ["Bengaluru", "Mysuru", "Mangalore"],
//     mainCity: "Bengaluru",
//     industries: ["Technology", "Education", "Biotech"],
//     growth: "+33%",
//     revenue: "₹38.7Cr",
//     projects: 132,
//   },
//   {
//     code: "IN-TN",
//     name: "Tamil Nadu",
//     clients: 276,
//     cities: ["Chennai", "Coimbatore", "Madurai"],
//     mainCity: "Chennai",
//     industries: ["Automotive", "Textiles", "Electronics"],
//     growth: "+22%",
//     revenue: "₹27.5Cr",
//     projects: 110,
//   },
//   {
//     code: "IN-GJ",
//     name: "Gujarat",
//     clients: 198,
//     cities: ["Ahmedabad", "Vadodara", "Surat"],
//     mainCity: "Ahmedabad",
//     industries: ["Chemicals", "Petrochemicals", "Pharma"],
//     growth: "+19%",
//     revenue: "₹24.3Cr",
//     projects: 89,
//   },
//   {
//     code: "IN-WB",
//     name: "West Bengal",
//     clients: 154,
//     cities: ["Kolkata", "Siliguri", "Durgapur"],
//     mainCity: "Kolkata",
//     industries: ["Port", "Film", "Textiles"],
//     growth: "+16%",
//     revenue: "₹18.9Cr",
//     projects: 76,
//   },
//   {
//     code: "IN-UP",
//     name: "Uttar Pradesh",
//     clients: 421,
//     cities: ["Lucknow", "Kanpur", "Noida"],
//     mainCity: "Lucknow",
//     industries: ["Agriculture", "Manufacturing", "IT"],
//     growth: "+24%",
//     revenue: "₹52.8Cr",
//     projects: 172,
//   },
//   {
//     code: "IN-BR",
//     name: "Bihar",
//     clients: 129,
//     cities: ["Patna", "Gaya"],
//     mainCity: "Patna",
//     industries: ["Agriculture", "Education"],
//     growth: "+12%",
//     revenue: "₹11.4Cr",
//     projects: 53,
//   },
//   {
//     code: "IN-MP",
//     name: "Madhya Pradesh",
//     clients: 183,
//     cities: ["Bhopal", "Indore", "Gwalior"],
//     mainCity: "Bhopal",
//     industries: ["Mining", "Tourism", "Education"],
//     growth: "+20%",
//     revenue: "₹21.7Cr",
//     projects: 92,
//   },
//   {
//     code: "IN-AP",
//     name: "Andhra Pradesh",
//     clients: 142,
//     cities: ["Visakhapatnam", "Vijayawada"],
//     mainCity: "Visakhapatnam",
//     industries: ["Shipping", "Agriculture"],
//     growth: "+18%",
//     revenue: "₹14.6Cr",
//     projects: 64,
//   },
//   {
//     code: "IN-TG",
//     name: "Telangana",
//     clients: 205,
//     cities: ["Hyderabad", "Warangal"],
//     mainCity: "Hyderabad",
//     industries: ["Technology", "Pharmaceuticals"],
//     growth: "+26%",
//     revenue: "₹28.9Cr",
//     projects: 102,
//   },
//   {
//     code: "IN-KL",
//     name: "Kerala",
//     clients: 158,
//     cities: ["Thiruvananthapuram", "Kochi"],
//     mainCity: "Thiruvananthapuram",
//     industries: ["Tourism", "Healthcare"],
//     growth: "+14%",
//     revenue: "₹17.2Cr",
//     projects: 68,
//   },
//   {
//     code: "IN-OR",
//     name: "Odisha",
//     clients: 134,
//     cities: ["Bhubaneswar", "Cuttack"],
//     mainCity: "Bhubaneswar",
//     industries: ["Mining", "Steel", "Ports"],
//     growth: "+21%",
//     revenue: "₹16.8Cr",
//     projects: 59,
//   },
//   {
//     code: "IN-RJ",
//     name: "Rajasthan",
//     clients: 167,
//     cities: ["Jaipur", "Udaipur"],
//     mainCity: "Jaipur",
//     industries: ["Tourism", "Handicrafts"],
//     growth: "+17%",
//     revenue: "₹19.5Cr",
//     projects: 74,
//   },
//   {
//     code: "IN-AS",
//     name: "Assam",
//     clients: 98,
//     cities: ["Guwahati", "Dibrugarh"],
//     mainCity: "Guwahati",
//     industries: ["Tea", "Oil", "Tourism"],
//     growth: "+13%",
//     revenue: "₹9.8Cr",
//     projects: 41,
//   },
// ];

// export function ClientDiversityMap() {
//   const [selectedState, setSelectedState] = useState<ClientLocation | null>(
//     null,
//   );
//   const [position, setPosition] = useState({
//     coordinates: [78.9629, 20.5937] as [number, number],
//     zoom: 1,
//   });
//   // const [showMobileDetails, setShowMobileDetails] = useState(false);
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 1200,
//     height: typeof window !== "undefined" ? window.innerHeight : 800,
//   });

//   const totalClients = clientData.reduce(
//     (sum, state) => sum + state.clients,
//     0,
//   );
//   const totalRevenue = clientData.reduce(
//     (sum, state) =>
//       sum + parseFloat(state.revenue.replace("₹", "").replace("Cr", "")),
//     0,
//   );
//   const averageGrowth = Math.round(
//     clientData.reduce((sum, state) => sum + parseInt(state.growth), 0) /
//       clientData.length,
//   );

//   const getStateColor = (clients: number) => {
//     if (clients > 300) return "#B91C1C";
//     if (clients > 200) return "#DC2626";
//     if (clients > 100) return "#EF4444";
//     if (clients > 50) return "#F87171";
//     return "#FCA5A5";
//   };

//   const handleStateClick = (state: ClientLocation) => {
//     setSelectedState(state);
//     // setShowMobileDetails(true);
//   };

//   const handleZoomIn = () => {
//     setPosition((pos) => ({
//       ...pos,
//       zoom: Math.min(pos.zoom * 1.3, 10),
//     }));
//   };

//   const handleZoomOut = () => {
//     setPosition((pos) => ({
//       ...pos,
//       zoom: Math.max(pos.zoom / 1.3, 1),
//     }));
//   };

//   const handleReset = () => {
//     setPosition({
//       coordinates: [78.9629, 22],
//       zoom: 1,
//     });
//     setSelectedState(null);
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="w-full">
//         {/* Header */}
//         <div className="px-4 py-6 text-center sm:py-8">
//           <h2 className="mb-2 text-2xl leading-tight font-bold text-red-700 sm:mb-4 sm:text-3xl lg:text-4xl">
//             Client Diversity Across India
//           </h2>
//           <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
//             Serving {totalClients.toLocaleString()} clients across{" "}
//             {clientData.length} states in India
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="mb-6 px-4">
//           <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
//             <StatCard
//               icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />}
//               value={`${totalClients.toLocaleString()}+`}
//               label="Total Clients"
//             />
//             <StatCard
//               icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />}
//               value={clientData.length}
//               label="States"
//             />
//             <StatCard
//               icon={
//                 <Building2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
//               }
//               value={`₹${totalRevenue.toFixed(1)}Cr`}
//               label="Total Revenue"
//             />
//             <StatCard
//               icon={
//                 <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
//               }
//               value={`+${averageGrowth}%`}
//               label="Avg Growth"
//             />
//           </div>
//         </div>

//         {/* Full Width Map Section */}
//         <div className="w-full border-y border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-6">
//           <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[65%_35%] xl:grid-cols-[70%_30%]">
//             {/* Map Section */}
//             <div className="bg-white p-3 sm:p-4 lg:p-6">
//               <div className="mb-3 px-2 sm:mb-4 sm:px-4">
//                 <h3 className="text-center text-lg font-bold text-red-700 sm:text-xl lg:text-2xl">
//                   Interactive Client Distribution Map
//                 </h3>
//               </div>

//               <div className="relative h-[300px] w-full sm:h-[400px] md:h-[450px] lg:h-[800px] xl:h-[600px] 2xl:h-[700px]">
//                 <ComposableMap
//                   projection="geoMercator"
//                   projectionConfig={{
//                     center: [78.9629, 29.4],
//                     scale:
//                       windowSize.width < 640
//                         ? 800
//                         : windowSize.width < 768
//                           ? 1000
//                           : windowSize.width < 1024
//                             ? 1200
//                             : windowSize.width < 1280
//                               ? 1400
//                               : 1150,
//                   }}
//                   className="h-full w-full"
//                 >
//                   <ZoomableGroup
//                     center={position.coordinates}
//                     zoom={position.zoom}
//                     onMoveEnd={({ coordinates, zoom }) =>
//                       setPosition({ coordinates, zoom })
//                     }
//                   >
//                     {/* <Geographies geography={GEO_URL}> */}
//                     <Geographies geography={GEO_URL}>
//                       {({ geographies }: { geographies: Feature<Geometry, GeoJsonProperties>[] }) =>
//                         geographies.map((geo : string | number | any  ) => {
//                           const state: ClientLocation | undefined = clientData.find(
//                             (s: ClientLocation) => s.code === geo.id,
//                           );
//                           const isSelected: boolean = selectedState?.code === geo.id;

//                           return (
//                             <Geography
//                               key={geo.rsmKey}
//                               geography={geo}
//                               fill={
//                                 state ? getStateColor(state.clients) : "#F3F4F6"
//                               }
//                               stroke="#1F2937"
//                               strokeWidth={isSelected ? 2 : 1}
//                               style={{
//                                 default: { outline: "none" },
//                                 hover: {
//                                   fill: state ? "#3B82F6" : "#E5E7EB",
//                                   outline: "none",
//                                   strokeWidth: 1.5,
//                                 },
//                                 pressed: { outline: "none" },
//                               }}
//                               onClick={() => {
//                                 if (state) handleStateClick(state);
//                               }}
//                             />
//                           );
//                         })
//                       }
//                     </Geographies>
//                     {clientData.map((state: ClientLocation) => (
//                       <Marker
//                         key={state.code}
//                         coordinates={getMarkerPosition(state.code)}
//                         onClick={() => handleStateClick(state)}
//                       >
//                         <g className="cursor-pointer">
//                           <circle
//                             r={
//                               selectedState?.code === state.code
//                                 ? windowSize.width < 640
//                                   ? 6
//                                   : windowSize.width < 768
//                                     ? 7
//                                     : windowSize.width < 1024
//                                       ? 8
//                                       : 10
//                                 : windowSize.width < 640
//                                   ? 4
//                                   : windowSize.width < 768
//                                     ? 5
//                                     : windowSize.width < 1024
//                                       ? 6
//                                       : 7
//                             }
//                             fill={
//                               selectedState?.code === state.code
//                                 ? "#EF4444"
//                                 : "#FFFFFF"
//                             }
//                             stroke={
//                               selectedState?.code === state.code
//                                 ? "#B91C1C"
//                                 : getStateColor(state.clients)
//                             }
//                             strokeWidth={
//                               selectedState?.code === state.code ? 3 : 2
//                             }
//                           />
//                           {selectedState?.code === state.code && (
//                             <text
//                               textAnchor="middle"
//                               y={
//                                 windowSize.width < 640
//                                   ? -10
//                                   : windowSize.width < 768
//                                     ? -12
//                                     : -15
//                               }
//                               className="fill-gray-800 text-xs font-bold sm:text-sm"
//                             >
//                               {state.name}
//                             </text>
//                           )}
//                         </g>
//                       </Marker>
//                     ))}
//                   </ZoomableGroup>
//                 </ComposableMap>

//                 {/* Map Controls */}
//                 <div className="absolute top-2 right-2 flex flex-col gap-1 rounded-lg bg-white/90 p-1 shadow-md backdrop-blur-sm sm:top-3 sm:right-3 sm:gap-2 sm:p-1.5">
//                   <button
//                     onClick={handleZoomIn}
//                     className="rounded-md p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
//                     aria-label="Zoom in"
//                   >
//                     <ZoomIn className="h-3 w-3 text-gray-700 sm:h-4 sm:w-4" />
//                   </button>
//                   <button
//                     onClick={handleZoomOut}
//                     className="rounded-md p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
//                     aria-label="Zoom out"
//                   >
//                     <ZoomOut className="h-3 w-3 text-gray-700 sm:h-4 sm:w-4" />
//                   </button>
//                   <button
//                     onClick={handleReset}
//                     className="rounded-md p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
//                     aria-label="Reset view"
//                   >
//                     <Move className="h-3 w-3 text-gray-700 sm:h-4 sm:w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Legend */}
//               {/* <div className="mt-4 sm:mt-6 px-2 sm:px-4">
//                 <div className="mx-auto max-w-6xl rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-lg">
//                   <h4 className="mb-2 sm:mb-3 text-center text-sm sm:text-base lg:text-lg font-semibold text-red-700">
//                     Client Density Legend
//                   </h4>
//                   <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6">
//                     {[
//                       { color: "#B91C1C", label: "300+ clients" },
//                       { color: "#DC2626", label: "200-299 clients" },
//                       { color: "#EF4444", label: "100-199 clients" },
//                       { color: "#F87171", label: "50-99 clients" },
//                       { color: "#FCA5A5", label: "Under 50 clients" },
//                     ].map((item, i) => (
//                       <div key={i} className="flex items-center gap-1.5 sm:gap-2">
//                         <div
//                           className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 rounded border border-gray-300"
//                           style={{ backgroundColor: item.color }}
//                         ></div>
//                         <span className="text-xs sm:text-sm font-medium text-gray-700">
//                           {item.label}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div> */}
//             </div>

//             {/* Right Panel */}
//             <div className="hidden space-y-4 bg-gray-100 p-3 sm:space-y-6 sm:p-4 lg:block lg:p-6">
//               {/* State Details Section */}
//               <div>
//                 {selectedState ? (
//                   <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
//                     <div className="mb-4 flex items-center justify-between sm:mb-6">
//                       <h3 className="truncate pr-2 text-lg font-bold text-red-700 sm:text-xl lg:text-2xl">
//                         {selectedState.name} Details
//                       </h3>
//                       <button
//                         onClick={() => setSelectedState(null)}
//                         className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
//                       >
//                         <X className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" />
//                       </button>
//                     </div>
//                     <StateDetailsContent selectedState={selectedState} />
//                   </div>
//                 ) : (
//                   <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-xl sm:p-6 lg:p-8">
//                     <Globe className="mx-auto mb-3 h-12 w-12 text-gray-300 sm:mb-4 sm:h-16 sm:w-16" />
//                     <h3 className="mb-2 text-lg font-semibold text-gray-700 sm:text-xl">
//                       Select a State
//                     </h3>
//                     <p className="text-sm text-gray-500 sm:text-base">
//                       {`Click on 'any' state on the map to view detailed information`}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Top States Section */}
//               <div>
//                 <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
//                   <h4 className="mb-4 text-center text-lg font-bold text-red-700 sm:mb-6 sm:text-xl">
//                     Top Performing States
//                   </h4>
//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 xl:grid-cols-2">
//                     {[...clientData]
//                       .sort((a, b) => b.clients - a.clients)
//                       .slice(0, 4)
//                       .map((state, index) => (
//                         <div
//                           key={state.code}
//                           className="cursor-pointer rounded-xl border border-gray-100 p-3 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:shadow-md sm:p-4"
//                           onClick={() => setSelectedState(state)}
//                         >
//                           <div className="mb-2 flex items-center gap-2 sm:gap-3">
//                             <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 sm:h-8 sm:w-8 sm:text-sm">
//                               {index + 1}
//                             </div>
//                             <div className="min-w-0 truncate text-sm font-semibold text-gray-800 sm:text-base">
//                               {state.name}
//                             </div>
//                           </div>
//                           <div className="space-y-1">
//                             <div className="truncate text-xs text-gray-500 sm:text-sm">
//                               {state.mainCity}
//                             </div>
//                             <div className="flex items-center justify-between gap-2">
//                               <span className="text-base font-bold text-red-700 sm:text-lg">
//                                 {state.clients}
//                               </span>
//                               <span className="flex-shrink-0 text-xs font-medium text-green-600 sm:text-sm">
//                                 {state.growth}
//                               </span>
//                             </div>
//                             <div className="truncate text-xs text-gray-600 sm:text-sm">
//                               {state.revenue}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Details Panel (when no bottom sheet) */}
//         <div className="mt-6 lg:hidden">
//           {selectedState ? (
//             <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
//               <div className="mb-4 flex items-center justify-between">
//                 <h3 className="text-lg font-bold text-red-700">
//                   {selectedState.name} Details
//                 </h3>
//                 <button
//                   onClick={() => setSelectedState(null)}
//                   className="rounded-full p-1 hover:bg-gray-100"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//               <MobileStateDetails selectedState={selectedState} />
//             </div>
//           ) : (
//             <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg">
//               <Globe className="mx-auto mb-4 h-12 w-12 text-gray-300" />
//               <p className="text-gray-500">
//                 Tap on any state on the map to view detailed information
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Mobile Top States List */}
//         <div className="mt-6 lg:hidden">
//           <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
//             <h4 className="mb-3 text-lg font-semibold text-red-700">
//               Top States
//             </h4>
//             <div className="space-y-2">
//               {[...clientData]
//                 .sort((a, b) => b.clients - a.clients)
//                 .slice(0, 5)
//                 .map((state, index) => (
//                   <div
//                     key={state.code}
//                     className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-red-50"
//                     onClick={() => handleStateClick(state)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium">{state.name}</div>
//                         <div className="text-xs text-gray-500">
//                           {state.mainCity}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm font-bold text-red-700">
//                         {state.clients}
//                       </div>
//                       <div className="text-xs text-green-600">
//                         {state.growth}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({
//   icon,
//   value,
//   label,
// }: {
//   icon: React.ReactNode;
//   value: string | number;
//   label: string;
// }) {
//   return (
//     <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">
//       <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
//         {icon}
//       </div>
//       <div className="mb-1 text-xl font-bold text-red-700">{value}</div>
//       <div className="text-sm font-medium text-gray-600">{label}</div>
//     </div>
//   );
// }

// function StateDetailsContent({
//   selectedState,
// }: {
//   selectedState: ClientLocation;
// }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//       <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">
//         <div className="mb-1 text-3xl font-bold text-red-700">
//           {selectedState.clients}
//         </div>
//         <div className="text-sm font-medium text-gray-600">Total Clients</div>
//       </div>

//       <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center">
//         <div className="mb-1 text-3xl font-bold text-green-600">
//           {selectedState.growth}
//         </div>
//         <div className="text-sm font-medium text-gray-600">Growth Rate</div>
//       </div>

//       <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
//         <div className="mb-1 text-3xl font-bold text-blue-600">
//           {selectedState.revenue}
//         </div>
//         <div className="text-sm font-medium text-gray-600">Revenue</div>
//       </div>

//       <div className="rounded-xl border border-purple-100 bg-purple-50 p-4 text-center">
//         <div className="mb-1 text-3xl font-bold text-purple-600">
//           {selectedState.projects}
//         </div>
//         <div className="text-sm font-medium text-gray-600">Projects</div>
//       </div>

//       <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:col-span-2">
//         <h5 className="mb-3 font-semibold text-gray-700">Major Cities</h5>
//         <div className="flex flex-wrap gap-2">
//           {selectedState.cities.map((city, index) => (
//             <span
//               key={index}
//               className="rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-700"
//             >
//               {city}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:col-span-2">
//         <h5 className="mb-3 font-semibold text-gray-700">Key Industries</h5>
//         <div className="flex flex-wrap gap-2">
//           {selectedState.industries.map((industry, index) => (
//             <span
//               key={index}
//               className="rounded-full bg-red-700 px-3 py-1 text-sm font-medium text-white"
//             >
//               {industry}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function getMarkerPosition(stateCode: string): [number, number] {
//   const positions: Record<string, [number, number]> = {
//     "IN-MH": [72.8777, 19.076], // Maharashtra (Mumbai)
//     "IN-KA": [77.5946, 12.9716], // Karnataka (Bengaluru)
//     "IN-TN": [80.2707, 13.0827], // Tamil Nadu (Chennai)
//     "IN-DL": [77.1025, 28.7041], // Delhi
//     "IN-UP": [80.9462, 26.8467], // Uttar Pradesh (Lucknow)
//     "IN-GJ": [72.5714, 23.0225], // Gujarat (Gandhinagar)
//     "IN-WB": [88.3639, 22.5726], // West Bengal (Kolkata)
//     "IN-TG": [78.4867, 17.385], // Telangana (Hyderabad)
//     "IN-AP": [80.648, 16.5062], // Andhra Pradesh (Amaravati)
//     "IN-HR": [77.031, 28.4595], // Haryana (Chandigarh)
//     "IN-BR": [85.1376, 25.5941], // Bihar (Patna)
//     "IN-MP": [77.4126, 23.2599], // Madhya Pradesh (Bhopal)
//     "IN-OR": [85.8245, 20.9517], // Odisha (Bhubaneswar)
//     "IN-RJ": [75.7873, 26.9124], // Rajasthan (Jaipur)
//     "IN-AS": [91.7362, 26.1445], // Assam (Guwahati)
//     "IN-KL": [76.2673, 10.8505], // Kerala (Thiruvananthapuram)
//   };
//   return positions[stateCode] ?? [78.9629, 20.5937];
// }

// function MobileStateDetails({
//   selectedState,
// }: {
//   selectedState: ClientLocation;
// }) {
//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Key Metrics Grid */}
//       <div className="grid grid-cols-2 gap-3 sm:gap-4">
//         <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-center sm:rounded-xl sm:p-4">
//           <div className="mb-1 text-xl font-bold text-red-700 sm:text-2xl lg:text-3xl">
//             {selectedState.clients.toLocaleString()}
//           </div>
//           <div className="text-sm font-medium text-gray-600 sm:text-base">
//             Clients
//           </div>
//         </div>
//         <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-center sm:rounded-xl sm:p-4">
//           <div className="mb-1 text-xl font-bold text-green-600 sm:text-2xl lg:text-3xl">
//             {selectedState.growth}
//           </div>
//           <div className="text-sm font-medium text-gray-600 sm:text-base">
//             Growth
//           </div>
//         </div>
//       </div>

//       {/* Revenue and Projects */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
//         <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 sm:rounded-xl sm:p-4">
//           <div className="mb-2 flex items-center gap-2">
//             <Building2 className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
//             <span className="text-sm font-medium text-gray-700 sm:text-base">
//               Revenue
//             </span>
//           </div>
//           <span className="block text-lg font-bold text-blue-700 sm:text-xl">
//             {selectedState.revenue}
//           </span>
//         </div>

//         <div className="rounded-lg border border-purple-100 bg-purple-50 p-3 sm:rounded-xl sm:p-4">
//           <div className="mb-2 flex items-center gap-2">
//             <Award className="h-4 w-4 text-purple-600 sm:h-5 sm:w-5" />
//             <span className="text-sm font-medium text-gray-700 sm:text-base">
//               Projects
//             </span>
//           </div>
//           <span className="block text-lg font-bold text-purple-700 sm:text-xl">
//             {selectedState.projects}
//           </span>
//         </div>
//       </div>

//       {/* Major Cities */}
//       <div className="rounded-lg border border-orange-100 bg-orange-50 p-3 sm:rounded-xl sm:p-4">
//         <div className="mb-3 flex items-center gap-2">
//           <MapPin className="h-4 w-4 text-orange-600 sm:h-5 sm:w-5" />
//           <span className="text-sm font-medium text-gray-700 sm:text-base">
//             Major Cities
//           </span>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {selectedState.cities.map((city, index) => (
//             <span
//               key={index}
//               className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-medium text-orange-700 shadow-sm sm:text-sm"
//             >
//               {city}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Key Industries */}
//       <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 sm:rounded-xl sm:p-4">
//         <div className="mb-3 flex items-center gap-2">
//           <Building2 className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
//           <span className="text-sm font-medium text-gray-700 sm:text-base">
//             Key Industries
//           </span>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {selectedState.industries.map((industry, index) => (
//             <span
//               key={index}
//               className="rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm sm:text-sm"
//             >
//               {industry}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Additional Info Section */}
//       <div className="grid grid-cols-1 gap-3 pt-2 sm:gap-4">
//         <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:rounded-xl sm:p-4">
//           <h4 className="mb-2 text-sm font-semibold text-gray-800 sm:text-base">
//             Quick Stats
//           </h4>
//           <div className="grid grid-cols-2 gap-4 text-center">
//             <div>
//               <div className="text-lg font-bold text-gray-700 sm:text-xl">
//                 {Math.round(
//                   selectedState.clients / selectedState.cities.length,
//                 )}
//               </div>
//               <div className="text-xs text-gray-500 sm:text-sm">
//                 Avg Clients/City
//               </div>
//             </div>
//             <div>
//               <div className="text-lg font-bold text-gray-700 sm:text-xl">
//                 {Math.round(
//                   (selectedState.projects / selectedState.clients) * 100,
//                 )}
//                 %
//               </div>
//               <div className="text-xs text-gray-500 sm:text-sm">
//                 Project Ratio
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { motion } from "motion/react";
import { WorldMap } from "src/_components/molecules/Map";

export function WorldMapDemo() {
  return (
    <div className=" py-40  bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl  text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
  {
    start: {
      lat: 64.8378,
      lng: -147.7164,
    }, // Fairbanks, Alaska, USA
    end: {
      lat: 34.0522,
      lng: -118.2437,
    }, // Los Angeles, California, USA
  },
  {
    start: { lat: 64.8378, lng: -147.7164 }, // Fairbanks, Alaska, USA
    end: { lat: -15.8267, lng: -47.9218 }, // Brasília, Brazil
  },
  {
    start: { lat: -15.8267, lng: -47.9218 }, // Brasília, Brazil
    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon, Portugal
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London, United Kingdom
    end: { lat: 28.6139, lng: 77.2090 }, // New Delhi, India
  },
  {
    start: { lat: 28.6139, lng: 77.2090 }, // New Delhi, India
    end: { lat: 43.1056, lng: 131.8735 }, // Vladivostok, Russia
  },
  {
    start: { lat: 28.6139, lng: 77.2090 }, // New Delhi, India
    end: { lat: -1.2864, lng: 36.8172 }, // Nairobi, Kenya
  },
]}
      />
    </div>
  );
}
