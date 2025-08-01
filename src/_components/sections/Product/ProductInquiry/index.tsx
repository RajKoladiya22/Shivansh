import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  MessageSquare,
  User,
  Building,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react";
import { btn_color } from "src/config/constants";

// Product interface (matching your existing structure)
interface Product {
  id: number;
  title: string;
  description: string;
  actualPrice: number;
  salePrice: number;
  image: string;
  category: string;
  industry: string;
  review: {
    averageRating: number;
    reviewCount: number;
  };
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  inquiryType: "general" | "pricing" | "demo" | "support";
  message: string;
  preferredContact: "email" | "phone" | "both";
  urgency: "low" | "medium" | "high";
}

interface ProductInquiryPopupProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: InquiryFormData & { productId: number | string }) => void;
}

// export const ProductInquiryPopup: React.FC<ProductInquiryPopupProps> = ({
//   product,
//   isOpen,
//   onClose,
//   onSubmit
// }) => {
//   const [activeTab, setActiveTab] = useState<'form' | 'call'>('form');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
//   const [formData, setFormData] = useState<InquiryFormData>({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     location: '',
//     inquiryType: 'general',
//     message: '',
//     preferredContact: 'email',
//     urgency: 'medium'
//   });

//   // Reset form when modal opens
//   useEffect(() => {
//     if (isOpen && product) {
//       setActiveTab('form');
//       setSubmitStatus('idle');
//       setFormData(prev => ({
//         ...prev,
//         message: `Hi, I'm interested in learning more about ${product.title}. Please provide more details about pricing, features, and implementation.`
//       }));
//     }
//   }, [isOpen, product]);

//   // Close modal with escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && isOpen) {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen, onClose]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!product) return;

//     setIsSubmitting(true);
//     setSubmitStatus('idle');

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Call the onSubmit callback if provided
//       if (onSubmit) {
//         onSubmit({ ...formData, productId: product.id });
//       }

//       setSubmitStatus('success');

//       // Auto close after success
//       setTimeout(() => {
//         onClose();
//       }, 2000);

//     } catch (error) {
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCallNow = () => {
//     // Replace with your actual phone number
//     const phoneNumber = '+911234567890';
//     window.open(`tel:${phoneNumber}`, '_self');
//   };

//   if (!isOpen || !product) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">

//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
//             aria-label="Close inquiry form"
//           >
//             <X className="h-5 w-5" />
//           </button>

//           <div className="grid grid-cols-1 lg:grid-cols-2">
//             {/* Left Side - Product Info */}
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//               <div className="mb-6">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="h-48 w-full rounded-xl object-cover shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                   {product.title}
//                 </h2>
//                 <p className="text-gray-600 mb-4 leading-relaxed">
//                   {product.description}
//                 </p>

//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-2xl font-bold text-[#C50202]">
//                       ₹{product.salePrice.toLocaleString()}
//                     </span>
//                     {product.actualPrice > product.salePrice && (
//                       <span className="text-lg text-gray-500 line-through">
//                         ₹{product.actualPrice.toLocaleString()}
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center space-x-1">
//                     <div className="flex">
//                       {Array.from({ length: 5 }, (_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < Math.floor(product.review.averageRating)
//                               ? 'text-yellow-400 fill-current'
//                               : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">
//                       ({product.review.reviewCount})
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-6">
//                   <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {product.category}
//                   </span>
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {product.industry}
//                   </span>
//                 </div>
//               </div>

//               {/* Contact Info */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Need Immediate Assistance?
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <Phone className="h-5 w-5 mr-3 text-[#C50202]" />
//                     <span>+91-1234567890</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Mail className="h-5 w-5 mr-3 text-[#C50202]" />
//                     <span>products@company.com</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="h-5 w-5 mr-3 text-[#C50202]" />
//                     <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Inquiry Form/Call Options */}
//             <div className="p-8">
//               {/* Tab Navigation */}
//               <div className="mb-6">
//                 <div className="flex rounded-lg bg-gray-100 p-1">
//                   <button
//                     onClick={() => setActiveTab('form')}
//                     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
//                       activeTab === 'form'
//                         ? 'bg-white text-[#C50202] shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     <MessageSquare className="h-4 w-4 inline mr-2" />
//                     Send Inquiry
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('call')}
//                     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
//                       activeTab === 'call'
//                         ? 'bg-white text-[#C50202] shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     <Phone className="h-4 w-4 inline mr-2" />
//                     Call Now
//                   </button>
//                 </div>
//               </div>

//               {/* Form Tab */}
//               {activeTab === 'form' && (
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                     Get Product Information
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Fill out the form below and we'll get back to you within 24 hours.
//                   </p>

//                   {submitStatus === 'success' && (
//                     <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
//                       <div className="flex items-center">
//                         <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
//                         <div>
//                           <h4 className="text-green-800 font-medium">Inquiry Submitted Successfully!</h4>
//                           <p className="text-green-700 text-sm">We'll contact you within 24 hours.</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {submitStatus === 'error' && (
//                     <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
//                       <div className="flex items-center">
//                         <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
//                         <div>
//                           <h4 className="text-red-800 font-medium">Something went wrong!</h4>
//                           <p className="text-red-700 text-sm">Please try again or call us directly.</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="space-y-4">
//                     {/* Name and Email */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Full Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                             placeholder="Your full name"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Email Address *
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                             placeholder="your@email.com"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Phone and Company */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number *
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                             placeholder="+91-9876543210"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Company Name
//                         </label>
//                         <div className="relative">
//                           <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                           <input
//                             type="text"
//                             name="company"
//                             value={formData.company}
//                             onChange={handleInputChange}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                             placeholder="Your company name"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Location and Inquiry Type */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Location
//                         </label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                           <input
//                             type="text"
//                             name="location"
//                             value={formData.location}
//                             onChange={handleInputChange}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                             placeholder="City, State"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Inquiry Type
//                         </label>
//                         <select
//                           name="inquiryType"
//                           value={formData.inquiryType}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                         >
//                           <option value="general">General Information</option>
//                           <option value="pricing">Pricing & Packages</option>
//                           <option value="demo">Request Demo</option>
//                           <option value="support">Technical Support</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Preferred Contact and Urgency */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Preferred Contact Method
//                         </label>
//                         <select
//                           name="preferredContact"
//                           value={formData.preferredContact}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                         >
//                           <option value="email">Email</option>
//                           <option value="phone">Phone Call</option>
//                           <option value="both">Both Email & Phone</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Urgency Level
//                         </label>
//                         <select
//                           name="urgency"
//                           value={formData.urgency}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent"
//                         >
//                           <option value="low">Low (Within a week)</option>
//                           <option value="medium">Medium (Within 2-3 days)</option>
//                           <option value="high">High (Within 24 hours)</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Message */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Message *
//                       </label>
//                       <textarea
//                         name="message"
//                         value={formData.message}
//                         onChange={handleInputChange}
//                         required
//                         rows={4}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent resize-none"
//                         placeholder="Tell us more about your requirements..."
//                       />
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                       type="button"
//                       onClick={handleSubmit}
//                       disabled={isSubmitting || submitStatus === 'success'}
//                       className="w-full bg-gradient-to-r from-[#C50202] to-red-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                           Submitting...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="h-5 w-5 mr-2" />
//                           Send Inquiry
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Call Tab */}
//               {activeTab === 'call' && (
//                 <div className="text-center">
//                   <div className="mb-8">
//                     <div className="w-20 h-20 bg-gradient-to-r from-[#C50202] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <Phone className="h-10 w-10 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                       Call for Instant Support
//                     </h3>
//                     <p className="text-gray-600 mb-6 leading-relaxed">
//                       Speak directly with our product experts for immediate assistance
//                       and personalized recommendations.
//                     </p>
//                   </div>

//                   <div className="bg-gray-50 rounded-xl p-6 mb-8">
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-center text-gray-600">
//                         <Phone className="h-5 w-5 mr-3 text-[#C50202]" />
//                         <span className="text-2xl font-bold text-gray-900">+91-1234567890</span>
//                       </div>
//                       <div className="flex items-center justify-center text-gray-600">
//                         <Clock className="h-5 w-5 mr-3 text-[#C50202]" />
//                         <span>Available: Mon-Sat, 9:00 AM - 7:00 PM</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <button
//                       onClick={handleCallNow}
//                       className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:from-green-600 hover:to-green-700 flex items-center justify-center"
//                     >
//                       <Phone className="h-5 w-5 mr-2" />
//                       Call Now
//                     </button>

//                     <button
//                       onClick={() => setActiveTab('form')}
//                       className="w-full border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
//                     >
//                       Or Send Written Inquiry
//                     </button>
//                   </div>

//                   <div className="mt-8 text-sm text-gray-500">
//                     <p>Average response time: Under 5 minutes</p>
//                     <p>Product specialists available to help</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Usage Example Component
// export const ProductInquiryExample = () => {
//   const [isInquiryOpen, setIsInquiryOpen] = useState(false);

//   // Sample product data
//   const sampleProduct: Product = {
//     id: 1,
//     title: "Advanced Tally ERP Solution",
//     description: "Complete business management software with advanced features for accounting, inventory, and compliance.",
//     actualPrice: 50000,
//     salePrice: 35000,
//     image: "/api/placeholder/400/300",
//     category: "ERP Software",
//     industry: "Accounting",
//     review: {
//       averageRating: 4.8,
//       reviewCount: 156
//     }
//   };

//   const handleInquirySubmit = (data: InquiryFormData & { productId: number }) => {
//     console.log('Inquiry submitted:', data);
//     // Handle the inquiry submission here
//     // This could be an API call to your backend
//   };

//   return (
//     <div className="p-8">
//       <button
//         onClick={() => setIsInquiryOpen(true)}
//         className="bg-[#C50202] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
//       >
//         Open Inquiry Popup
//       </button>

//       <ProductInquiryPopup
//         product={sampleProduct}
//         isOpen={isInquiryOpen}
//         onClose={() => setIsInquiryOpen(false)}
//         onSubmit={handleInquirySubmit}
//       />
//     </div>
//   );
// };

// export default ProductInquiryExample;

// Simplified Product Inquiry Popup Component
export const ProductInquiryPopup: React.FC<ProductInquiryPopupProps> = ({
  product,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    inquiryType: "general",
    message: "",
    preferredContact: "email",
    urgency: "medium",
  });

  // Reset form when modal opens with new product
  useEffect(() => {
    if (isOpen && product) {
      setActiveTab("form");
      setSubmitStatus("idle");
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'm interested in learning more about ${product.title}. Please provide more details about pricing, features, and implementation.`,
      }));
    }
  }, [isOpen, product?.id]); // Watch for product ID changes

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!product) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   if (onSubmit) {
      //     onSubmit({ ...formData, productId: product.id });
      //   }

      setSubmitStatus("success");

      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not open or no product
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:bg-black/50"
          aria-label="Close preview"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Product Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              <div className="mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full rounded-xl object-cover shadow-md"
                />
              </div>

              <div className="mb-4">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  {product.title}
                </h2>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {product.description}
                </p>

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">
                      ₹{product.salePrice.toLocaleString()}
                    </span>
                    {product.actualPrice > product.salePrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.actualPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-yellow-400 ${i < Math.floor(product.review.averageRating) ? "" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.review.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {product.industry}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Need Immediate Assistance?
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-3">📞</span>
                    <span>+91 8141703007</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">✉️</span>
                    <span>info@shivanshinfosys.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">🕒</span>
                    <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Get Product Information
              </h3>
              <p className="mb-6 text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center text-green-700">
                    <span className="mr-3">✅</span>
                    <div>
                      <h4 className="font-medium">
                        Inquiry Submitted Successfully!
                      </h4>
                      <p className="text-sm">
                        We'll contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center text-red-700">
                    <span className="mr-3">❌</span>
                    <div>
                      <h4 className="font-medium">Something went wrong!</h4>
                      <p className="text-sm">
                        Please try again or call us directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                >
                  <option value="general">General Information</option>
                  <option value="pricing">Pricing & Packages</option>
                  <option value="demo">Request Demo</option>
                  <option value="support">Technical Support</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Your Message *"
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500"
                />

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitStatus === "success"}
                  className={`${btn_color} flex w-full items-center justify-center rounded-lg px-6 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
