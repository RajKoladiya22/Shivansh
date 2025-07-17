import React from "react";
import { IndustryCard } from "./IndustryCard";
import { SectionHeader } from "src/_components/ui";

export const WiseSolutionsIndustry = () => {
  const industries = [
    {
      id: "manufacturers",
      title: "Manufacturers",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
    {
      id: "distributors",
      title: "Distributors",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
    {
      id: "retailers",
      title: "Retailers",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
    {
      id: "service-providers",
      title: "Service Providers",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
    {
      id: "service",
      title: "Service",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
    {
      id: "ca-tax",
      title: "CA & Tax Consultants",
      description:
        "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionHeader 
          heading="INDUSTRY" 
          headingText="Solutions Show how you help"
          showDescription={false} />
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>

        {/* Optional: Add some spacing at the bottom */}
        <div className="mt-16"></div>
      </div>
    </div>
  );
};
