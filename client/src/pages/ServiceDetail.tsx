import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import serviceImage from "../assets//images/servicesimg.jpg"

const allProducts = [
  { id: 1, title: 'Web Design', description: 'Modern web design service', category: 'Tech' },
  { id: 2, title: 'Graphic Design', description: 'Logos, flyers, and more', category: 'Fashion' },
  { id: 3, title: 'Plumbing Services', description: 'Expert plumbing for home and office', category: 'Home' },
  { id: 4, title: 'Electrician Services', description: 'Certified electrical solutions', category: 'Home' },
  // ...other services
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = allProducts.find(item => item.id === Number(id));

  if (!service) {
    return <div className="text-center mt-10">Service not found.</div>;
  }

  const handleBooking = (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Success!',
        text: `Booked Successfully`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className=" text-blue-800 px-4 py-4 rounded transition"
      >
        ← Back
      </button>

      <div className="w-[90%] mx-auto mt-2 flex flex-col lg:flex-row flex-wrap items-start gap-10">
        {/* Left: Service Info */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full lg:w-[60%]">
          <img
            src={serviceImage} // Replace with real image
            alt={service.title}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-3 text-blue-900">{service.title}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <p className="text-sm text-gray-500">Category: {service.category}</p>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Service Address</label>
              <input
                type="text"
                placeholder="123 Main St, City"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Preferred Date</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
