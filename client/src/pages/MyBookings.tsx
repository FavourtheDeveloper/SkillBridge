import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api"; // Make sure this is your Axios instance

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]); // 👈 ensure array type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 👇 Log it to confirm structure
        console.log("Booking response:", response.data);

        // 👇 Ensure it's an array before setting
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          console.error("Unexpected response format:", response.data);
          setBookings([]);
        }

      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">My Bookings</h1>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-white shadow-md p-4 rounded-lg border-l-4 border-blue-600"
              >
                <p className="font-semibold">{booking.Gig?.title || "Service"}</p>
                <p>Name: {booking.name}</p>
                <p>Email: {booking.email}</p>
                <p>Address: {booking.address}</p>
                <p>Amount: #{booking.amount}</p>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
