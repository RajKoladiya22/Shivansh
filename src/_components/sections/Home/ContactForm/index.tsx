// "use client";
// import React, { useState } from 'react';

// export const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     helpFor: '',
//     message: ''
//   });

// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//   const { name, value } = e.target;
//   setFormData(prev => ({ ...prev, [name]: value }));
// };

//   const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log('Form submitted:', formData);
//     // You can add your form submission logic here
//   };

//   return (
//     <div className="bg-(--primery-color) py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
//             {`Let's Keep in Touch`}
//           </h1>
//         </div>

//         {/* Contact Form */}
//         <div className="space-y-6">
//           {/* Name and Email Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
//                 Name*
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Shivansh Infosys"
//                 className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
//                 Email*
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="support@shivanshinfosys.com"
//                 className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Phone and Help For Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
//                 Phone*
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+91 90510 58963"
//                 className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="helpFor" className="block text-white text-sm font-medium mb-2">
//                 Help for?*
//               </label>
//               <input
//                 type="text"
//                 id="helpFor"
//                 name="helpFor"
//                 value={formData.helpFor}
//                 onChange={handleChange}
//                 placeholder="What can we help you with?"
//                 className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Message Field */}
//           <div>
//             <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
//               Your Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Drop Your Message"
//               rows={6}
//               className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-6">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="bg-white text-red-600 font-semibold py-3 px-12 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 text-sm tracking-wider"
//             >
//               SUBMIT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";

// export const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     helpFor: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validate = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone is required";
//     } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
//       newErrors.phone = "Invalid phone number";
//     }
//     if (!formData.helpFor.trim()) newErrors.helpFor = "This field is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setIsSubmitting(true);
//     // Simulate form submission
//     setTimeout(() => {
//       console.log("Form submitted:", formData);
//       setIsSubmitting(false);
//       // Reset form after submission
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         helpFor: "",
//         message: "",
//       });
//       alert("Thank you! Your message has been sent successfully.");
//     }, 1500);
//   };

//   return (
//     <div className="px-4 py-12 sm:px-6 lg:px-8" id="contact">
//       <div className="mx-auto max-w-4xl rounded-3xl border border-red-800 bg-gradient-to-t from-red-900 to-red-950 p-8 sm:p-12">
//         <div className="flex mb-12 text-center">
//           <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
//             {`Let's Keep in Touch`}
//           </h1>
//           <p className="mx-auto max-w-2xl text-lg text-white/80">
//             Have questions or want to discuss a project? Reach out and we'll get
//             back to you within 24 hours.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-white"
//                 >
//                   Name*
//                 </label>
//                 {errors.name && (
//                   <span className="text-xs text-red-300">{errors.name}</span>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Shivansh Infosys"
//                 className={`w-full rounded-lg bg-white/90 px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none ${errors.name ? "ring-2 ring-red-400" : ""}`}
//                 aria-invalid={!!errors.name}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//               />
//             </div>

//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-white"
//                 >
//                   Email*
//                 </label>
//                 {errors.email && (
//                   <span className="text-xs text-red-300">{errors.email}</span>
//                 )}
//               </div>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="support@shivanshinfosys.com"
//                 className={`w-full rounded-lg bg-white/90 px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none ${errors.email ? "ring-2 ring-red-400" : ""}`}
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-white"
//                 >
//                   Phone*
//                 </label>
//                 {errors.phone && (
//                   <span className="text-xs text-red-300">{errors.phone}</span>
//                 )}
//               </div>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+91 90510 58963"
//                 className={`w-full rounded-lg bg-white/90 px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none ${errors.phone ? "ring-2 ring-red-400" : ""}`}
//                 aria-invalid={!!errors.phone}
//                 aria-describedby={errors.phone ? "phone-error" : undefined}
//               />
//             </div>

//             <div>
//               <div className="mb-2 flex items-center justify-between">
//                 <label
//                   htmlFor="helpFor"
//                   className="block text-sm font-medium text-white"
//                 >
//                   Help for?*
//                 </label>
//                 {errors.helpFor && (
//                   <span className="text-xs text-red-300">{errors.helpFor}</span>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 id="helpFor"
//                 name="helpFor"
//                 value={formData.helpFor}
//                 onChange={handleChange}
//                 placeholder="What can we help you with?"
//                 className={`w-full rounded-lg bg-white/90 px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none ${errors.helpFor ? "ring-2 ring-red-400" : ""}`}
//                 aria-invalid={!!errors.helpFor}
//                 aria-describedby={errors.helpFor ? "helpFor-error" : undefined}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="message"
//               className="mb-2 block text-sm font-medium text-white"
//             >
//               Your Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Drop Your Message"
//               rows={4}
//               className="min-h-[120px] w-full resize-none rounded-lg bg-white/90 px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none"
//             />
//           </div>

//           <div className="flex justify-center pt-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`flex min-w-[160px] transform items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold tracking-wider text-red-600 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none sm:px-12 ${
//                 isSubmitting ? "cursor-not-allowed opacity-75" : ""
//               }`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="mr-2 -ml-1 h-4 w-4 animate-spin text-red-600"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   PROCESSING...
//                 </>
//               ) : (
//                 "SUBMIT"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//     </div>
//   );
// };

"use client";
import React, { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    helpFor: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        newErrors.phone = "Phone number must be 10-15 digits";
      }
    }

    if (!formData.helpFor.trim()) {
      newErrors.helpFor = "Please tell us how we can help";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (typeof firstErrorField === "string" && firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSuccess(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        helpFor: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const helpOptions = [
    { value: "", label: "Select a service..." },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "e-commerce", label: "E-commerce Solutions" },
    { value: "consulting", label: "Technology Consulting" },
    { value: "other", label: "Other Services" },
  ];

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8" id="contact">
      {/* Success Message */}
      {isSuccess && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
          <div className="flex items-center rounded-lg bg-green-500 p-4 text-white shadow-lg">
            <svg
              className="mr-3 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-semibold">Message sent successfully!</p>
              <p className="text-sm opacity-90">
                {`We'll get back to you within 24 hours.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            {`Let's Work Together`}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            {`Have a project in mind? We'd love to hear about it. Send us a
            message and we'll respond within 24 hours.`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-6xl gap-6 items-center justify-center">
          {/* Contact Form */}
          <div className="w-full lg:w-[70%] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-semibold text-white">
                Tell us about your project
              </h2>
              <p className="mt-2 text-red-100">
                {`Fill out the form below and we'll get back to you soon.`}
              </p>
            </div>

            {/* Form Body */}
            <div className="px-6 py-8 sm:px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <div className="mt-1 flex items-center">
                          <svg
                            className="mr-1 h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className="text-sm text-red-600"
                            id="name-error"
                          >
                            {errors.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <div className="mt-1 flex items-center">
                          <svg
                            className="mr-1 h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className="text-sm text-red-600"
                            id="email-error"
                          >
                            {errors.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone and Help For Row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 90510 58963"
                        className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <div className="mt-1 flex items-center">
                          <svg
                            className="mr-1 h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className="text-sm text-red-600"
                            id="phone-error"
                          >
                            {errors.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="helpFor"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="helpFor"
                        name="helpFor"
                        value={formData.helpFor}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-xl border bg-right bg-no-repeat px-4 py-3 text-gray-900 transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.helpFor
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white"
                        }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1.5em 1.5em",
                        }}
                        aria-invalid={!!errors.helpFor}
                        aria-describedby={
                          errors.helpFor ? "helpFor-error" : undefined
                        }
                      >
                        {helpOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.helpFor && (
                        <div className="mt-1 flex items-center">
                          <svg
                            className="mr-1 h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span
                            className="text-sm text-red-600"
                            id="helpFor-error"
                          >
                            {errors.helpFor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Project Details
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your project requirements, timeline, and any specific goals you have in mind..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-400 hover:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                      {formData.message.length}/500
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col items-center justify-center space-y-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group focus:ring-opacity-50 relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-red-700 hover:to-red-800 hover:shadow-xl focus:ring-4 focus:ring-red-500 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${
                      isSubmitting ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-3 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>

                    {/* Ripple Effect */}
                    <span className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
                  </button>

                  <p className="max-w-md text-center text-sm text-gray-500">
                    {`By submitting this form, you agree to our privacy policy.
                    We'll never share your information with third parties.`}
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="w-full lg:w-[30%] mt-12 lg:mt-0 grid gap-10">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Email
              </h3>
              <p className="mt-1 text-gray-600">support@shivanshinfosys.com</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Phone
              </h3>
              <p className="mt-1 text-gray-600">+91 99999 99999</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Response Time
              </h3>
              <p className="mt-1 text-gray-600">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
