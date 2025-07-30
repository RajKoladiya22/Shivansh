import React from 'react';
import { ContactWidget } from '../../Blog/Sidebar';

interface SidebarFiltersProps {
  showFilters: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  clearFilters: () => void;
  categories: string[];
  industries: string[];
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  showFilters,
  selectedCategory,
  setSelectedCategory,
  selectedIndustry,
  setSelectedIndustry,
  priceRange,
  setPriceRange,
  clearFilters,
  categories,
  industries,
}) => {
  return (
    <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-21">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={clearFilters}
            className="cursor-pointer text-[#C50202] text-sm hover:underline font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent transition-all duration-200 bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent transition-all duration-200 bg-white"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range (₹)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C50202] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Enter price range to filter products
          </div>
        </div>

        {/* Quick Price Filters */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Price Filters
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPriceRange({ min: '', max: '5000' })}
              className="p-2 cursor-pointer text-xs border border-gray-300 rounded-lg hover:bg-[#FCF2F2] hover:border-[#C50202] transition-colors"
            >
              Under ₹5K
            </button>
            <button
              onClick={() => setPriceRange({ min: '5000', max: '25000' })}
              className="p-2 cursor-pointer text-xs border border-gray-300 rounded-lg hover:bg-[#FCF2F2] hover:border-[#C50202] transition-colors"
            >
              ₹5K - ₹25K
            </button>
            <button
              onClick={() => setPriceRange({ min: '25000', max: '50000' })}
              className="p-2 cursor-pointer text-xs border border-gray-300 rounded-lg hover:bg-[#FCF2F2] hover:border-[#C50202] transition-colors"
            >
              ₹25K - ₹50K
            </button>
            <button
              onClick={() => setPriceRange({ min: '50000', max: '' })}
              className="p-2 cursor-pointer text-xs border border-gray-300 rounded-lg hover:bg-[#FCF2F2] hover:border-[#C50202] transition-colors"
            >
              Above ₹50K
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2 ">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 bg-[#FFCCD6] text-[#C50202] text-xs rounded-full">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="cursor-pointer ml-1 hover:text-[#C50202] font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {selectedIndustry !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 bg-[#FFCCD6] text-[#C50202] text-xs rounded-full">
                {selectedIndustry}
                <button
                  onClick={() => setSelectedIndustry('All')}
                  className="cursor-pointer ml-1 hover:text-[#C50202] font-bold"
                >
                  ×
                </button>
              </span>
            )}
            {(priceRange.min || priceRange.max) && (
              <span className="inline-flex items-center px-2 py-1 bg-[#FFCCD6] text-[#C50202] text-xs rounded-full">
                ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                <button
                  onClick={() => setPriceRange({ min: '', max: '' })}
                  className="cursor-pointer ml-1 hover:text-[#C50202] font-bold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          {(selectedCategory === 'All' && selectedIndustry === 'All' && !priceRange.min && !priceRange.max) && (
            <p className="text-xs text-gray-500 italic">No filters applied</p>
          )}
        </div>

        <div className="hidden sm:block pt-5">
          <ContactWidget />
        </div>
      </div>

      
    </div>
  );
};

