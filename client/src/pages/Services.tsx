import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";
import CategorySelector from "../components/CategorySelector";
import ServiceCard from "../components/ServiceCard";

const allProducts = [
  { id: 1, title: 'Web Design', description: 'Modern web design service', category: 'Tech' },
  { id: 2, title: 'Graphic Design', description: 'Logos, flyers, and more', category: 'Fashion' },
  { id: 3, title: 'SEO Optimization', description: 'Improve your Google ranking', category: 'Tech' },
  { id: 4, title: 'App Development', description: 'iOS and Android apps', category: 'Tech' },
  { id: 5, title: 'Copywriting', description: 'Professional content writing', category: 'Education' },
  { id: 6, title: 'Photography', description: 'Product & event photography', category: 'Entertainment' },
  { id: 7, title: 'Fashion Consulting', description: 'Style and trends advice', category: 'Fashion' },
  { id: 8, title: 'Health Coaching', description: 'Personal health plans', category: 'Health' },
  { id: 9, title: 'Education Tutoring', description: 'One-on-one sessions', category: 'Education' },
  { id: 10, title: 'Entertainment Events', description: 'Concert and show planning', category: 'Entertainment' },
  { id: 11, title: 'SEO Analysis', description: 'Detailed site audit', category: 'Tech' },
  { id: 12, title: 'Fitness Training', description: 'Personal fitness coaching', category: 'Health' },
  { id: 13, title: 'Entertainment Events', description: 'Concert and show planning', category: 'Entertainment' },
  { id: 14, title: 'SEO Analysis', description: 'Detailed site audit', category: 'Tech' },
  { id: 15, title: 'Fitness Training', description: 'Personal fitness coaching', category: 'Health' },
];




const ITEMS_PER_PAGE = 12;

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  

  // Filter products by category
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page change
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-950 w-full max-w-screen-lg mx-auto mt-9 p-20 rounded-4xl text-white">
        <h2 className="text-5xl font-poppins font-extrabold leading-18 px-10">Amazing Services</h2>
        <small className="px-10">Home | Our Services</small>
      </div>

      <div className="max-w-screen-lg mx-auto mt-5 flex-1 flex flex-col">
        <SearchInput />

        <div className="flex flex-col mt-5 md:flex-row">
          {/* Sidebar / category selector */}
          <CategorySelector
            className="md:w-64 w-full p-5 rounded-xl flex-shrink-0"
            onSelectCategory={setSelectedCategory}
          />

          {/* Product/Service cards */}
          <main className="flex-1 p-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {paginatedProducts.length === 0 ? (
    <p className="text-gray-600 col-span-full text-center">No services found.</p>
  ) : (
    paginatedProducts.map((product) => (
      <ServiceCard product={product} />
    
    ))
  )}
</main>


        </div>

        {/* Pagination controls */}
        <nav className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  pageNum === currentPage ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
