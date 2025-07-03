import React, { useEffect, useState } from "react";
import API from "../api";

interface CategorySelectorProps {
  className?: string;
  onSelectCategory?: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  className,
  onSelectCategory,
}) => {
  const [selected, setSelected] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  const handleChange = (cat: string) => {
    setSelected(cat);
    onSelectCategory?.(cat);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/gigs");
        const gigs = res.data.gigs || [];

        const uniqueCategories = Array.from(
          new Set(gigs.map((gig: any) => gig.category).filter(Boolean))
        );

        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Failed to fetch gigs for categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={className}>
      {/* Mobile Dropdown */}
      <div className="sm:hidden mb-4">
        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Category
        </label>
        <select
          id="category-select"
          className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by Category</h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                  selected === cat
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => handleChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CategorySelector;
