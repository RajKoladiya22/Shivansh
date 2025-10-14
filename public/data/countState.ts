
import { FaCertificate, FaChartLine, FaHandshake, FaUsers, FaWrench, FaYoutube } from "react-icons/fa";
import type { StatItem } from "src/_components/sections/types/startItem.type";

export const stats: StatItem[] = [
  {
    number: "18+",
    description: "Years of Experience",
    icon: FaChartLine,
  },
  {
    number: "1000+",
    description: "Happy Tally Customers (All Over India)",
    icon: FaUsers,
  },
  {
    number: "3000+",
    description: "Happy Customers Base All Over India",
    icon: FaHandshake,
  },
  {
    number: "66,000+",
    description: "Youtube Subscribers",
    icon: FaYoutube,
  },
  
  {
    number: "13",
    description: "GST Expert & Tally Certified Team",
    icon: FaCertificate, // fallback to Wrench or another valid Lucide icon
  },
  {
    number: "400+",
    description: "Tally Customization Tool",
    icon: FaWrench, // fallback to Tools or another valid Lucide icon
  },
];