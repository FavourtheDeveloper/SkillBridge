import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ assuming this is your axios instance

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    if (token) {
      fetchBookingCount(token);
    }

    const handleBookingUpdate = () => {
      if (token) {
        fetchBookingCount(token);
      }
    };

    // Listen for booking updates (dispatched in ServiceDetail after booking)
    window.addEventListener('bookingUpdated', handleBookingUpdate);

    return () => {
      window.removeEventListener('bookingUpdated', handleBookingUpdate);
    };
  }, []);

  const fetchBookingCount = async (token) => {
    try {
      const response = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookingCount(response.data.bookings.length);
    } catch (error) {
      console.error("Failed to fetch booking count:", error);
      setBookingCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };


  return (
    <nav className="bg-blue-700 text-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/">
            <div className="text-xl font-bold text-white">SkillBridge</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services">
              <span className="text-white hover:text-orange-400">Home</span>
            </Link>

            {user && (
              <Link to="/my-bookings" className="relative">
                <span className="text-white hover:text-orange-400">
                  My Bookings
                </span>
                {bookingCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
                    {bookingCount}
                  </span>
                )}
              </Link>
            )}

            {!user ? (
              <Link to="/auth">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition">
                  Login / Register
                </button>
              </Link>
            ) : (
              <>
                <span className="text-white">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-lg">
          <Link to="/services" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {user && (
            <Link to="/my-bookings" className="block text-gray-700 hover:text-blue-600 relative">
              My Bookings
              {bookingCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
                  {bookingCount}
                </span>
              )}
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth"
              className="block text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-center"
            >
              Login / Register
            </Link>
          ) : (
            <>
              <span className="block text-gray-800 text-center">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
