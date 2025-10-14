import { Target, Eye, BookOpen, Clock } from "lucide-react";

export const AboutUs = [
  {
    id: "introduction",
    title: "Introduction",
    icon: <BookOpen className="h-8 w-8 text-yellow-300" />,
    content: `Mehul Patel is a visionary entrepreneur and the founder of a leading business solutions firm specializing in Tally and GST services. Known for his strategic thinking and deep industry knowledge, Mehul has built a strong reputation for delivering smart, efficient, and result-oriented solutions that empower businesses to achieve sustainable growth. His leadership philosophy is rooted in two core values — the growth of his customers and the development of his team — ensuring both clients and employees thrive together in a culture of excellence and innovation.`,
    highlights: [
      "18+ Years Experience",
      "Fortune 500 Trusted",
      "99.9% Client Satisfaction",
    ],
    gradient: "from-red-500 via-red-600 to-red-700",
  },
  { 
    id: "history",
    title: "Our History",
    icon: <Clock className="h-8 w-8 text-yellow-300" />,
    content: `Mehul Patel began his professional journey in 2007 as a solo entrepreneur with a clear and ambitious mission: to simplify business management through intelligent, technology-driven solutions. What started as a one-person initiative has since evolved into a thriving organization with a dedicated team of 13 Tally and GST experts.
Under Mehul’s dynamic leadership, the firm has successfully catered to more than 3,000 satisfied clients across India, providing over 400 customized business solutions that address a wide range of operational and financial challenges. His consistent focus on quality, customer satisfaction, and innovation has positioned the company as a trusted partner for businesses nationwide.`,
    highlights: ["Founded 2007", "600+ Companies", "Nationwide Presence"],
    gradient: "from-red-700 via-red-600 to-red-400",
  },
  {
    id: "vision",
    title: "Vision",
    icon: <Eye className="h-8 w-8 text-yellow-300" />,
    content: `To be the most trusted Tally partner, driving efficiency and growth through innovative solutions that transform businesses and exceed expectations`,
    highlights: ["Future-Ready", "Technology-Driven", "Empowerment Focus"],
    gradient: "from-red-400 via-red-600 to-red-700",
  },
  {
    id: "mission",
    title: "Mission",
    icon: <Target className="h-8 w-8 text-yellow-300" />,
    content: `To deliver reliable Tally services and customizations that solve business challenges and drive mutual success by working alongside clients to identify problems and develop effective, tailored solutions.`,
    highlights: ["Growth-Focused", "Compliance-Ready", "Expert Guidance"],
    gradient: "from-red-500 via-red-600 to-red-700",
  },
];
