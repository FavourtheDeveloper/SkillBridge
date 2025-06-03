import React, { useState } from "react";

const categories = ['All', 'Tech', 'Fashion', 'Health', 'Education', 'Entertainment'];

interface CategorySelectorProps {
  className?: string;
  onSelectCategory?: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ className, onSelectCategory }) => {
  const [selected, setSelected] = useState("All");

  const handleChange = (cat: string) => {
    setSelected(cat);
    if (onSelectCategory) onSelectCategory(cat);
  };

  return (
    <div className={className}>
      {/* Dropdown for mobile */}
      <select
        className="block mb-4 p-2 border border-blue-950 rounded sm:hidden"
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Sidebar for sm+ */}
      <aside className="hidden sm:block border border-blue-950 rounded-xl p-8 w-fit">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`text-left px-3 py-2 rounded hover:bg-blue-100 text-gray-700 w-full ${
                  selected === cat ? "bg-blue-200 font-semibold" : ""
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
