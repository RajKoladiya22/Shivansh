import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { services } from "src/_components/sections/Services"
import { SectionHeader } from "src/_components/ui"

export const MoreService = () => {
    return(
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="tally erp & TDL"
              headingText="  Expertise & Solutions "
              headingDescription="Specialized support for Tally ERP software with custom TDL
              development and comprehensive training programs."
              // descriptionClassName="mx-auto"
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#C502021A] bg-white p-8 shadow-lg transition-all duration-300 hover:border-[#C50202] hover:shadow-xl"
              >
                <div className="mb-6 text-[#C50202]">{service.icon}</div>
                <h3 className="mb-4 text-2xl font-bold text-[#000000]">
                  {service.title}
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {service.shortDescription}
                </p>
                <Link
                  href={`${service.id}`}
                  className="flex items-center font-semibold text-[#C50202] transition-colors duration-300 hover:text-[#C5020280]"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
    )
}