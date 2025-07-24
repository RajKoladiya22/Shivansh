import { Target, Eye, BookOpen, Clock } from "lucide-react";

export const AboutUs = [
  {
    id: "introduction",
    title: "Introduction",
    icon: <BookOpen className="h-8 w-8 text-yellow-300" />,
    content: `We are a leading financial technology company dedicated to revolutionizing the way Indian enterprises manage their financial operations. With over 15 years of industry expertise, we provide cutting-edge accounting solutions that seamlessly integrate with modern business workflows. Our comprehensive platform combines advanced technology with deep financial knowledge to deliver unparalleled clarity and control over your financial journey.`,
    highlights: [
      "15+ Years Experience",
      "Fortune 500 Trusted",
      "99% Client Satisfaction",
    ],
    gradient: "from-red-500 via-red-600 to-red-700",
  },
  {
    id: "history",
    title: "Our History",
    icon: <Clock className="h-8 w-8 text-yellow-300" />,
    content: `Founded in 2009, our journey began with a simple yet powerful vision: to democratize financial management for businesses of all sizes across India. Starting as a small team of passionate financial experts and technology innovators, we have grown into a trusted partner for over 600 companies nationwide. Our evolution has been marked by continuous innovation, strategic partnerships, and an unwavering commitment to our clients' success.`,
    highlights: ["Founded 2009", "600+ Companies", "Nationwide Presence"],
    gradient: "from-red-700 via-red-600 to-red-400",
  },
  {
    id: "vision",
    title: "Vision",
    icon: <Eye className="h-8 w-8 text-yellow-300" />,
    content: `To pioneer a future where every Indian enterprise, big or small, navigates its financial journey with absolute clarity and confidence. We envision a vibrant ecosystem of seamlessly integrated accounting solutions, where cutting-edge technology and human expertise converge to transform complexity into simplicity, empowering businesses nationwide to achieve their fullest potential.`,
    highlights: ["Future-Ready", "Technology-Driven", "Empowerment Focus"],
    gradient: "from-red-400 via-red-600 to-red-700",
  },
  {
    id: "mission",
    title: "Mission",
    icon: <Target className="h-8 w-8 text-yellow-300" />,
    content: `Our mission is to empower businesses with intelligent financial solutions that drive growth, ensure compliance, and provide actionable insights. We are committed to delivering exceptional service through innovative technology, expert guidance, and personalized support. We strive to be the catalyst that transforms financial complexity into competitive advantage for every client we serve.`,
    highlights: ["Growth-Focused", "Compliance-Ready", "Expert Guidance"],
    gradient: "from-red-500 via-red-600 to-red-700",
  },
];
