//  <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name and Email Row */}
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-semibold text-gray-900"
//                     >
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="John Doe"
//                         className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
//                           errors.name
//                             ? "border-red-300 bg-red-50"
//                             : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
//                         }`}
//                         aria-invalid={!!errors.name}
//                         aria-describedby={
//                           errors.name ? "name-error" : undefined
//                         }
//                       />
//                       {errors.name && (
//                         <div className="mt-1 flex items-center">
//                           <svg
//                             className="mr-1 h-4 w-4 text-red-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span
//                             className="text-sm text-red-600"
//                             id="name-error"
//                           >
//                             {errors.name}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-semibold text-gray-900"
//                     >
//                       Email Address <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="john@example.com"
//                         className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
//                           errors.email
//                             ? "border-red-300 bg-red-50"
//                             : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
//                         }`}
//                         aria-invalid={!!errors.email}
//                         aria-describedby={
//                           errors.email ? "email-error" : undefined
//                         }
//                       />
//                       {errors.email && (
//                         <div className="mt-1 flex items-center">
//                           <svg
//                             className="mr-1 h-4 w-4 text-red-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span
//                             className="text-sm text-red-600"
//                             id="email-error"
//                           >
//                             {errors.email}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Phone and Help For Row */}
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-semibold text-gray-900"
//                     >
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="+91 90510 58963"
//                         className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
//                           errors.phone
//                             ? "border-red-300 bg-red-50"
//                             : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
//                         }`}
//                         aria-invalid={!!errors.phone}
//                         aria-describedby={
//                           errors.phone ? "phone-error" : undefined
//                         }
//                       />
//                       {errors.phone && (
//                         <div className="mt-1 flex items-center">
//                           <svg
//                             className="mr-1 h-4 w-4 text-red-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span
//                             className="text-sm text-red-600"
//                             id="phone-error"
//                           >
//                             {errors.phone}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="helpFor"
//                       className="block text-sm font-semibold text-gray-900"
//                     >
//                       How can we help? <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <select
//                         id="helpFor"
//                         name="helpFor"
//                         value={formData.helpFor}
//                         onChange={handleChange}
//                         className={`w-full appearance-none rounded-xl border bg-right bg-no-repeat px-4 py-3 text-gray-900 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
//                           errors.helpFor
//                             ? "border-red-300 bg-red-50"
//                             : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
//                         }`}
//                         style={{
//                           backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
//                           backgroundPosition: "right 0.75rem center",
//                           backgroundSize: "1.5em 1.5em",
//                         }}
//                         aria-invalid={!!errors.helpFor}
//                         aria-describedby={
//                           errors.helpFor ? "helpFor-error" : undefined
//                         }
//                       >
//                         {helpOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.helpFor && (
//                         <div className="mt-1 flex items-center">
//                           <svg
//                             className="mr-1 h-4 w-4 text-red-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span
//                             className="text-sm text-red-600"
//                             id="helpFor-error"
//                           >
//                             {errors.helpFor}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Message Field */}
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-semibold text-gray-900"
//                   >
//                     Project Details
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us more about your project requirements, timeline, and any specific goals you have in mind..."
//                       rows={5}
//                       className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-400 hover:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
//                     />
//                     <div className="absolute right-3 bottom-3 text-xs text-gray-400">
//                       {formData.message.length}/500
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex flex-col items-center justify-center space-y-4 pt-6">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`group focus:ring-opacity-50 relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-red-700 hover:to-red-800 hover:shadow-xl focus:ring-4 focus:ring-red-500 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${
//                       isSubmitting ? "cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <span className="relative z-10 flex items-center justify-center">
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="mr-3 h-5 w-5 animate-spin text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Sending Message...
//                         </>
//                       ) : (
//                         <>
//                           Send Message
//                           <svg
//                             className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M14 5l7 7m0 0l-7 7m7-7H3"
//                             />
//                           </svg>
//                         </>
//                       )}
//                     </span>

//                     {/* Ripple Effect */}
//                     <span className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
//                   </button>

//                   <p className="max-w-md text-center text-sm text-gray-500">
//                     {`By submitting this form, you agree to our privacy policy.
//                     We'll never share your information with third parties.`}
//                   </p>
//                 </div>
//               </form>

// <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
//   <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
//     <div className="mb-4 flex items-center justify-between">
//       <h3 className="text-lg font-semibold">Filters</h3>
//       <button
//         onClick={clearFilters}
//         className="text-sm text-[#C50202] hover:underline"
//       >
//         Clear All
//       </button>
//     </div>

//     {/* Category Filter */}
//     <div className="mb-6">
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         Category
//       </label>
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#C50202]"
//       >
//         {categories.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Industry Filter */}
//     <div className="mb-6">
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         Industry
//       </label>
//       <select
//         value={selectedIndustry}
//         onChange={(e) => setSelectedIndustry(e.target.value)}
//         className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#C50202]"
//       >
//         {industries.map((industry) => (
//           <option key={industry} value={industry}>
//             {industry}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Price Range Filter */}
//     <div className="mb-6">
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         Price Range (₹)
//       </label>
//       <div className="flex gap-2">
//         <input
//           type="number"
//           placeholder="Min"
//           value={priceRange.min}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, min: e.target.value })
//           }
//           className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#C50202]"
//         />
//         <input
//           type="number"
//           placeholder="Max"
//           value={priceRange.max}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, max: e.target.value })
//           }
//           className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#C50202]"
//         />
//       </div>
//     </div>
//   </div>
// </div>;
