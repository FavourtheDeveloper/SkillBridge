import { useEffect, useState } from "react";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/bookings/my-bookings", {
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

  const markAsCompleted = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(`/bookings/complete/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
                  order.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status || "Pending"}
              </p>

              {/* Show button only if status is not completed */}
              {order.status !== "Completed" && (
                <button
                  onClick={() => markAsCompleted(order.id)}
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
