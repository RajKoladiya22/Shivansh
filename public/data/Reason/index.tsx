import {
  Award,
  TrendingUp,
  MessageSquare,
  Headphones,
  Users,
  Clock,
  Globe,
} from "lucide-react";

export const reasons = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Get Expert Consultation",
    description:
      "Connect with our specialists for personalized solutions tailored to your business needs.",
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "Customer Support",
    description:
      "Need help? Our dedicated support team is here to assist you around the clock.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Scale Your Business",
    description:
      "Discuss growth strategies and learn how we can help you reach your next milestone.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Partnership Opportunities",
    description:
      "Explore collaboration possibilities and join our network of successful partners.",
  },
];

export const OurArchivements = [
  {
    icon: <Users className="h-6 w-6 sm:h-7 sm:w-7" />,
    number: "500+",
    label: "Happy Clients",
  },
  {
    icon: <Award className="h-6 w-6 sm:h-7 sm:w-7" />,
    number: "15+",
    label: "Awards Won",
  },
  {
    icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7" />,
    number: "10+",
    label: "Years Experience",
  },
  {
    icon: <Globe className="h-6 w-6 sm:h-7 sm:w-7" />,
    number: "50+",
    label: "Countries",
  },
];
