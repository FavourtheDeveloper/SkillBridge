import { Link } from 'react-router-dom';
import ServiceImage from '../assets/images/servicesimg.jpg';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full h-16 bg-blue-700 text-white shadow flex items-center justify-between px-4">
      {/* Sidebar toggle (visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-white focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Logo */}
      <Link to={'/'}>
        <h1 className="text-lg font-semibold">SkillBridge</h1>
      </Link>

      {/* Profile section */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">Hello, Artisan</span>
        <img
          src={ServiceImage}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
