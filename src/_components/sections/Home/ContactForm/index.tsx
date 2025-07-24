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
import { contactInfo } from "../../Contact/HeroContact";
import { CheckCircle, Send } from "lucide-react";

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    reason: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        reason: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   helpFor: "",
  //   message: "",
  // });

  // const [errors, setErrors] = useState<Record<string, string>>({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);

  // const validate = () => {
  //   const newErrors: Record<string, string> = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name is required";
  //   } else if (formData.name.trim().length < 2) {
  //     newErrors.name = "Name must be at least 2 characters";
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email address";
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "Phone number is required";
  //   } else {
  //     const phoneDigits = formData.phone.replace(/\D/g, "");
  //     if (phoneDigits.length < 10 || phoneDigits.length > 15) {
  //       newErrors.phone = "Phone number must be 10-15 digits";
  //     }
  //   }

  //   if (!formData.helpFor.trim()) {
  //     newErrors.helpFor = "Please tell us how we can help";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >,
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   // Clear error when user starts typing
  //   if (errors[name]) {
  //     setErrors((prev) => ({ ...prev, [name]: "" }));
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validate()) {
  //     // Focus on first error field
  //     const firstErrorField = Object.keys(errors)[0];
  //     if (typeof firstErrorField === "string" && firstErrorField) {
  //       document.getElementById(firstErrorField)?.focus();
  //     }
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     console.log("Form submitted:", formData);
  //     setIsSuccess(true);

  //     // Reset form after successful submission
  //     setFormData({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       helpFor: "",
  //       message: "",
  //     });

  //     // Hide success message after 5 seconds
  //     setTimeout(() => setIsSuccess(false), 5000);
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const helpOptions = [
  //   { value: "", label: "Select a service..." },
  //   { value: "web-development", label: "Web Development" },
  //   { value: "mobile-app", label: "Mobile App Development" },
  //   { value: "ui-ux-design", label: "UI/UX Design" },
  //   { value: "digital-marketing", label: "Digital Marketing" },
  //   { value: "e-commerce", label: "E-commerce Solutions" },
  //   { value: "consulting", label: "Technology Consulting" },
  //   { value: "other", label: "Other Services" },
  // ];

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8" id="contact">
      {/* Success Message */}
      {/* {isSuccess && (
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
      )} */}

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

        <div className="flex max-w-6xl flex-col justify-center gap-6 lg:flex-row">
          {/* Contact Form */}
          <div className="w-full overflow-hidden rounded-2xl border border-red-100 bg-white shadow-2xl lg:w-[70%]">
            {/* Form Header */}
            {/* <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-semibold text-white">
                Tell us about your project
              </h2>
              <p className="mt-2 text-red-100">
                {`Fill out the form below and we'll get back to you soon.`}
              </p>
            </div> */}

            {/* Form Body */}
            <div className="px-6 py-8 sm:px-8">
              {isSubmitted ? (
                <div className="py-8 text-center sm:py-12">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-700 sm:mb-6 sm:h-20 sm:w-20">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-red-700 sm:mb-4 sm:text-2xl">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    {`Thank you for reaching out. We'll get back to you within
                      24 hours.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {/* Form Header */}
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      Get In Touch
                    </h2>
                    <p className="text-gray-600">
                      {`Send us a message and we'll respond as soon as possible.`}
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Reason for Contact *
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                    >
                      <option value="">Select a reason</option>
                      <option value="consultation">Expert Consultation</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                      placeholder="Tell us more about your project or inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex w-full transform items-center justify-center space-x-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white sm:h-5 sm:w-5"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 grid hidden w-full gap-10 rounded-xl border border-red-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 lg:mt-0 lg:grid lg:w-[30%]">
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-3 border-b border-gray-300 py-4 last:border-b-0 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4 sm:py-6 lg:flex-col lg:items-center lg:space-y-2 lg:space-x-0 xl:flex-row xl:items-start xl:space-y-0 xl:space-x-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-red-700 shadow-md sm:h-12 sm:w-12">
                  {contact.icon}
                </div>
                <div className="text-center sm:text-left lg:text-center xl:text-left">
                  <h4 className="mb-2 text-sm font-semibold text-red-700 sm:text-base">
                    {contact.title}
                  </h4>
                  {contact.details.map((detail, detailIndex) => (
                    <p
                      key={detailIndex}
                      className="text-xs text-gray-600 sm:text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
