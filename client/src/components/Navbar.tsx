import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-700 text-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={"/"}><div className="text-xl font-bold text-white">SkillBridge</div></Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
           <Link to={"/"}><a href="#" className="text-white hover:text-orange-500">Home</a></Link> 

            {/* Login/Register as a button */}
            <Link to={"/auth"}><button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Login / Register
            </button></Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-lg">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="block text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-center mt-2">
            Login / Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
