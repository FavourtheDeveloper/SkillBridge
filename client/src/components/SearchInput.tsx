// components/SearchInput.tsx
import React from "react";

const SearchInput = ({ onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search services..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full border border-blue-900 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
