import {
  FactoryIcon,
  TruckIcon,
  ShoppingCartIcon,
  WrenchIcon,
  UsersIcon,
  CalculatorIcon,
} from "lucide-react";
import type { IndustryItem } from "src/_components/sections/types/Industry.type";
export const industries: IndustryItem[] = [
  {
    id: "manufacturers",
    title: "Manufacturers",
    description:
      "Streamline production processes with our specialized Tally solutions for manufacturing efficiency and inventory management.",
    icon: <FactoryIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "distributors",
    title: "Distributors",
    description:
      "Optimize your supply chain with distribution-focused tools for order tracking, logistics management, and route optimization.",
    icon: <TruckIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "retailers",
    title: "Retailers",
    description:
      "Transform retail operations with point-of-sale integration, inventory tracking, and customer relationship management tools.",
    icon: <ShoppingCartIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "service-providers",
    title: "Service Providers",
    description:
      "Manage service contracts, scheduling, and billing with our specialized solutions for service-based businesses.",
    icon: <WrenchIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "enterprises",
    title: "Enterprises",
    description:
      "Comprehensive ERP solutions for large organizations with multi-location management and consolidated reporting.",
    icon: <UsersIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "ca-tax",
    title: "CA & Tax Consultants",
    description:
      "Specialized tools for accounting professionals with GST compliance, tax filing, and client management features.",
    icon: <CalculatorIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
];
