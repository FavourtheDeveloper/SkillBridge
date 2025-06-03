import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-500" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Keywords"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </form>
  );
};

export default SearchInput;
