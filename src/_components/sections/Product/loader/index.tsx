import { Loader } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center gap-2 text-[#C50202]">
      <Loader className="h-6 w-6 animate-spin" />
      <span className="text-lg font-medium">Loading more products...</span>
    </div>
  </div>
);