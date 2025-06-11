import { NavLink } from "react-router-dom";
import { Home, FileText, ClipboardList, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "My Gigs", icon: <FileText size={18} />, path: "/dashboard/my-gigs" },
    { name: "Orders", icon: <ClipboardList size={18} />, path: "/dashboard/orders" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/edit-profile" },
  ];

  return (
    <div className="w-52 bg-blue-950 text-white p-4 space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-7">Artisan Panel</h2>
      <nav className="space-y-3">
        {navItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
