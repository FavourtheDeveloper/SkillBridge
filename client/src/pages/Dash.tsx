import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ServiceImage from "../assets/images/servicesimg.jpg";

const Dash = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");
  const [balance, setBalance] = useState(0);


  // 🔒 Redirect to login if token is missing
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token) {
      navigate("/auth");
    } else {
      setUserName(user?.name || "User");
    }

    // 🔄 Fetch user profile
    API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setBalance(res.data.balance || 0);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });

  }, [navigate]);

  // 📦 Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/bookings/gig-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = Array.isArray(res.data)
          ? res.data
          : res.data.bookings || [];

        setBookings(result);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filter === "All" || booking.status === filter;
    const matchesSearch = booking.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Top Cards */}
      <div className="flex justify-around mt-5 container m-auto">
        {/* Welcome Card */}
        <div className="flex items-center bg-orange-500 rounded-2xl text-white p-5">
          <div>
            <h2 className="text-4xl pb-2">Good Morning, Egbon <br /> {userName}</h2>
            <p className="text-sm">
              Welcome back! Here's a quick summary of your <br /> dashboard.
            </p>
          </div>
          <div>
            <img
              className="w-32 h-32 mx-5 rounded-full object-cover"
              src={ServiceImage}
              alt="profilePic"
            />
          </div>
        </div>

        {/* Balance Card */}
<div className="flex items-center bg-green-600 rounded-2xl text-white p-5">
  <div>
    <h2 className="text-2xl pb-2">Wallet Balance</h2>
    <p className="text-4xl font-bold">₦{balance.toLocaleString()}</p>
    <p className="text-sm mt-1">Keep track of your earnings here</p>
  </div>
  <div>
    <img
      className="w-32 h-32 mx-5 rounded-full object-cover"
      src={ServiceImage}
      alt="Wallet"
    />
  </div>
</div>

      </div>

      {/* Dashboard Overview */}
      <div className="container m-auto p-5 mt-7">
        <h2 className="text-xl font-extrabold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Bookings</h3>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Accepted Orders</h3>
            <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Accepted").length}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Rejected Orders</h3>
            <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Rejected").length}</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by customer name..."
            className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded px-3 py-2 ml-4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gig</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center px-6 py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{booking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{booking.Gig?.title || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-sm text-gray-500" colSpan={3}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dash;
