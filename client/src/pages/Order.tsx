import { useEffect, useState } from "react";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/bookings/gig-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.bookings || [];

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    id: number,
    action: "Accepted" | "Rejected"
  ) => {
    const token = localStorage.getItem("token");

    const endpoint =
      action === "Accepted"
        ? `/bookings/accept/${id}`
        : `/bookings/reject/${id}`;

    try {
      await API.put(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchOrders(); // Refresh
    } catch (err) {
      console.error(`Failed to ${action} booking:`, err);
    }
  };

  const markAsCompleted = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/bookings/complete/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh the orders after update
      fetchOrders();
    } catch (error) {
      console.error("Failed to mark booking as completed:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-900">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg text-gray-800">
                {order.Gig?.title || "Service"}
              </h3>
              <p className="text-sm text-gray-600">{order.name}</p>
              <p className="text-sm text-gray-600">{order.email}</p>
              <p className="text-sm text-gray-600">{order.address}</p>
              <p className="text-sm text-gray-600">₦{order.amount}</p>
              <p className="text-sm">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-semibold ${
                  order.status === "Accepted"
                    ? "text-green-600"
                    : order.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </p>

              {/* Show button only if status is not completed */}
              {order.status === "Pending" && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleStatusChange(order.id, "Accepted")}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Rejected")}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
