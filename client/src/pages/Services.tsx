import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";
import CategorySelector from "../components/CategorySelector";
import ServiceCard from "../components/ServiceCard";
import Recommendations from "../components/Recommendations";
import API from "../api";

const ITEMS_PER_PAGE = 12;

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNearby, setFilterNearby] = useState(false); // ✅ toggle nearby
  const [locationSupported, setLocationSupported] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, [filterNearby]);

  const fetchServices = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      let response;

      if (filterNearby && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            response = await API.get("/gigs/nearby", {
              params: { latitude, longitude },
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            // If you want only gigs, not users, you may need to fetch their gigs too
            setServices(response.data.gigs || []);
            setLoading(false);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setLocationSupported(false);
            setFilterNearby(false);
            setLoading(false);
          }
        );
      } else {
        // Fallback to all gigs
        response = await API.get("/gigs", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setServices(response.data.gigs || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
      setLoading(false);
    }
  };

  const filteredServices = services.filter((gig) => {
    const matchesCategory = selectedCategory === "All" || gig.category === selectedCategory;
    const matchesSearch =
      gig.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-950 w-full max-w-screen-lg mx-auto mt-9 p-10 md:p-20 rounded-4xl text-white">
        <h2 className="text-3xl md:text-5xl font-poppins font-extrabold leading-tight">
          Amazing Services
        </h2>
        <small>Home | Our Services</small>
      </section>

      {/* Main Section */}
      <div className="max-w-screen-lg mx-auto w-full flex-1 mt-8 px-4 md:px-0">
        <SearchInput onSearch={setSearchTerm} />

        {/* Toggle Nearby Services ✅ */}
        <div className="flex items-center mt-4">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filterNearby}
              onChange={(e) => setFilterNearby(e.target.checked)}
              className="form-checkbox text-blue-600"
              disabled={!navigator.geolocation}
            />
            <span>Show services near me</span>
          </label>

          {!locationSupported && (
            <span className="ml-4 text-xs text-red-500">
              Location permission denied or unsupported.
            </span>
          )}
        </div>

        <Recommendations token={token} />

        <div className="flex flex-col mt-6 md:flex-row gap-6">
          {/* Category Sidebar */}
          <CategorySelector
            className="md:w-64 w-full p-5 rounded-xl flex-shrink-0"
            onSelectCategory={setSelectedCategory}
          />

          {/* Services Grid */}
          <div className="flex-1">
            <main
              className={`grid gap-6 ${
                filteredServices.length < 3
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {loading ? (
                <p className="col-span-full text-center text-gray-500">
                  Loading services...
                </p>
              ) : paginatedServices.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  No services found.
                </p>
              ) : (
                paginatedServices.map((gig) => (
                  <ServiceCard key={gig.id} product={gig} />
                ))
              )}
            </main>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex justify-center space-x-2">
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
                    pageNum === currentPage
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100"
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
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;
