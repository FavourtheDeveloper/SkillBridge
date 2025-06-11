
const Orders = () => {
  const orders = [
    { id: 1, service: "Fan Repair", status: "Pending" },
    { id: 2, service: "Wiring", status: "Completed" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{order.service}</h3>
            <p className={`text-sm ${order.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
