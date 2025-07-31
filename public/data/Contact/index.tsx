import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export const SocialMedia = [
  { icon: <FaFacebook className="h-5 w-5" />, href: "#" },
  // { icon: <Twitter className="h-5 w-5" />, href: "#" },
  { icon: <FaInstagram className="h-5 w-5" />, href: "#" },
  // { icon: <FaPinterest className="h-5 w-5" />, href: "#" },
  { icon: <FaYoutube className="h-5 w-5" />, href: "#" },
  { icon: <FaWhatsapp className="h-5 w-5" />, href: "#" },
];


export const contactInfo = [
  {
    icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Phone",
    details: ["+91 8141703007", "+91 8141703007"],
  },
  {
    icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Email",
    details: ["info@shivanshinfosys.com", "info@shivanshinfosys.com"],
  },
  {
    icon: <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "WhatsApp",
    details: ["+91 8141703007", "+91 8141703007"],
  },
  {
    icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Office",
    details: ["214,215 Soham Arcad", "Adajan, Surat, Gujarat 395009"],
  },
];