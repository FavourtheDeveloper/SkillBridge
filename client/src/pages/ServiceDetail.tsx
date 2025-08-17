import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import API from "../api";
import { Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import defaultServiceImage from "../assets/images/servicesimg.jpg";
import { jwtDecode } from "jwt-decode";


const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await API.get(`/gigs/${id}`);
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service:", error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({ icon: "warning", title: "Login Required" });
      return navigate("/auth");
    }
  
    const decoded = jwtDecode(token);
    const userId = decoded?.id;
  
    if (userId === service?.userId) {
      return Swal.fire("Warning", "You can't book your own gig.", "warning");
    }
  
    const name = e.target.form[0].value.trim();
    const email = e.target.form[1].value.trim();
    const address = e.target.form[2].value.trim();
    const date = e.target.form[3].value.trim();
  
    if (!name || !email || !address || !date) {
      return Swal.fire("Incomplete", "Fill all fields", "error");
    }
  
    try {
      const payment = await API.post("/payments/initiate", {
        amount: service?.price,
        email,
        gigId: service?.id,
        name,
        address,
        date,
        userId, // optional
      });
  
      window.location.href = payment.data.authorization_url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to initiate payment", "error");
    }
  };
  
  
  
  
  
  
  

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!service) return <div className="text-center mt-10">Service not found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="text-blue-800 px-4 py-4 rounded transition"
      >
        ← Back
      </button>

      <div className="w-[90%] mx-auto mt-2 flex flex-col lg:flex-row flex-wrap items-start gap-10">
        {/* Left: Service Info */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full lg:w-[60%]">
          <img
            src={service.image || defaultServiceImage}
            alt={service.title}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-3 text-blue-900">{service.title}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <p className="text-sm text-gray-500">Category: {service.category}</p>
          <p className="text-lg font-semibold text-green-600 mt-2">₦{service.price}</p> {/* ✅ Display price */}
          <div className="flex items-center space-x-1 pt-3 text-yellow-500 text-sm">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="currentColor" />
            ))}
            <Star size={14} className="text-gray-300" />
            <span className="text-gray-600 ml-2 font-medium">(4.5)</span>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:w-[35%]">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Book This Service</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Service Address</label>
              <input
                type="text"
                placeholder="123 Main St, City"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Preferred Date</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      <div className="mt-20" />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
