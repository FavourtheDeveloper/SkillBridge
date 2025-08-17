// pages/MyBookings.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api";

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyAndFetch = async () => {
      const token = localStorage.getItem("token");
      const reference = searchParams.get("reference");
  
      // 🔒 Prevent multiple calls for same reference
      const verifiedRef = sessionStorage.getItem("verifiedRef");
  
      if (reference && reference !== verifiedRef) {
        try {
          await API.get(`/payments/verify/${reference}`);
          sessionStorage.setItem("verifiedRef", reference); // ✅ mark as verified
          console.log("✅ Payment verified");
  
          // Clean the URL
          const url = new URL(window.location.href);
          url.searchParams.delete("reference");
          window.history.replaceState({}, "", url);
        } catch (err) {
          console.error("❌ Verification failed", err);
        }
      }
  
      try {
        const res = await API.get("/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.bookings || [];
  
        setBookings(result);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
  
    verifyAndFetch();
  }, [searchParams]);
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex-1 px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">My Bookings</h1>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-lg">No bookings found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-blue-700">
                    {booking.Gig?.title || "Service"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Amount:</strong> ₦{booking.amount}</p>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;
