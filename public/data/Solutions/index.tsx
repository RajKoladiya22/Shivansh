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
      "Easily manage raw materials, WIP, BOM, and inventory while gaining real-time insights on costs, stock, wastage, and dispatches to boost efficiency and profitability.",
    icon: <FactoryIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "distributors",
    title: "Distributors",
    description:
      "Streamline distribution with Tally tools like Salesman Module, Job Work TDLs, Material In–Out, and LR Transport for smooth logistics, real-time tracking, and faster growth.",
    icon: <TruckIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "retailers",
    title: "Retailers",
    description:
      "Boost retail with Tally add-ons like Loyalty & Commission Module, industry-specific invoices, packing slips, price level management, and auto mail reminders for better customer connect.",
    icon: <ShoppingCartIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "service-providers",
    title: "Service Providers",
    description:
      "Simplify service management with Tally solutions like Share Accounting, Service Invoices, AMC tracking, and Finance Module to stay organized and deliver efficiently.",
    icon: <WrenchIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "enterprises",
    title: "Enterprises",
    description:
      "Ensure security with user access, approvals, and document attachments, while managing multi-company accounts, branch reports, multi-godown stock, and MIS insights.",
    icon: <UsersIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
  {
    id: "ca-tax",
    title: "CA & Tax Consultants",
    description:
      "Simplify compliance with Tally TDLs for GST, TDS, MSME, and 180-day reports, plus bulk entries and bank import features for faster, accurate operations.",
    icon: <CalculatorIcon className="h-8 w-8 text-white" />,
    color: "from-red-600 to-red-700",
  },
];
