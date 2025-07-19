type Industry = {
  id: string;
  title: string;
  description: string;
};

export const IndustryCard = ({ industry }: { industry: Industry }) => {
  return (
    <div className="rounded-2xl border-2 border-red-100 bg-white p-6 transition-all duration-300 hover:border-red-200 hover:shadow-lg">
      <div className="mb-4 flex items-center">
        <div className="mr-4 rounded-lg bg-red-500 p-3">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-2 w-2 rounded-sm bg-white"></div>
            <div className="h-2 w-2 rounded-sm bg-white"></div>
            <div className="h-2 w-2 rounded-sm bg-white"></div>
            <div className="h-2 w-2 rounded-sm bg-white"></div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {industry.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">
        {industry.description}
      </p>
    </div>
  );
};
