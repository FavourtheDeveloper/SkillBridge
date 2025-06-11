import { useState } from "react";
import Topbar from "../components/Topbar";
import DashSidebar from "../components/DashSidebar";
import { Routes, Route } from "react-router-dom";
import MyGigs from "./MyGigs";
import Orders from "./Order";
import Dash from "./Dash";
import EditProfile from "./EditProfile";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block fixed md:fixed top-0 left-0 h-full w-52 bg-white shadow-md z-20`}
      >
        <DashSidebar />
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex flex-col md:ml-52 min-h-screen">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 bg-gray-100 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
