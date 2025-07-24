import type { IndustryCardProps, IndustryItem } from "src/_components/sections/types/Industry.type";
import { motion } from "framer-motion";

export const IndustryCard: React.FC<IndustryCardProps> = ({
  industry,
  index,
}: {
  industry: IndustryItem;
  index: number;
}) => {
  const dots: number[] = Array.from({ length: 3 }, (_, i) => i);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 border-red-100 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl">
        {/* Icon with gradient background */}
        <div className={`bg-gradient-to-r ${industry.color} p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm">
              {industry.icon}
            </div>
            <div className="text-4xl font-bold text-white/20">{`0${index + 1}`}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-900">
            {industry.title}
          </h3>
          <p className="mb-6 flex-1 text-gray-600">{industry.description}</p>

          <div className="mt-auto flex items-center justify-between">
            <button className="flex items-center text-sm font-medium text-red-600 group-hover:underline hover:text-red-700">
              Explore Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="flex space-x-1">
              {dots.map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
