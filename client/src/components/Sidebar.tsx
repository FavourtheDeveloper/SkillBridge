
import { Home, FileText, ClipboardList, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/" },
    { name: "My Gigs", icon: <FileText size={18} />, path: "/my-gigs" },
    { name: "Orders", icon: <ClipboardList size={18} />, path: "/orders" },
    { name: "Post a Gig", icon: <Plus size={18} />, path: "/post-gig" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5 space-y-6">
      <h2 className="text-xl font-bold">Artisan Panel</h2>
      <nav className="space-y-3">
        {navItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
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
