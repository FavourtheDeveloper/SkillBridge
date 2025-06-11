import { useState } from "react";
import ServiceImage from '../assets/images/servicesimg.jpg'

const Dash = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: 1, customer: "John Doe", gig: "Plumbing Fix", status: "Pending" },
    { id: 2, customer: "Jane Smith", gig: "Electrical Setup", status: "Completed" },
    { id: 3, customer: "Alice Brown", gig: "Cleaning Service", status: "Pending" },
    { id: 4, customer: "Bob Johnson", gig: "Painting Job", status: "Completed" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "All" || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="flex justify-around mt-5 container m-auto">
        <div className="flex items-center bg-orange-500 rounded-2xl text-white p-5">
        <div>
            <h2 className="text-4xl pb-2">Good Morning, Favour</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing  <br /> elit.
            amet consectetur adipisicing elit. </p>
        </div>

        <div>
            <img className="w-32 h-32 mx-5 rounded-full object-cover" src={ServiceImage} alt="profilePic" />
        </div>
        </div>

        <div className="flex items-center bg-orange-500 rounded-2xl text-white p-5">
        <div>
            <h2 className="text-2xl pb-2">Invite your friends, reward yourself</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing  <br /> elit.  
            amet consectetur adipisicing elit. </p>
        </div>

        <div>
            <img className="w-32 h-32 mx-5 rounded-full object-cover" src={ServiceImage} alt="profilePic" />
        </div>
        </div>

        
    </div>

      <div className="container m-auto p-5 mt-7">
        <h2 className="text-xl font-extrabold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Gigs</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm text-gray-500">Completed Orders</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Search and Filter */}
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
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Orders Table */}
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.gig}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-sm text-gray-500" colSpan="3">
                    No orders found.
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
