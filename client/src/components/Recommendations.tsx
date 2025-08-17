import { useEffect, useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";

const Recommendations = ({ token }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get("http://localhost:3000/api/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  if (loading) return <p className="text-gray-500">Loading recommendations...</p>;

  if (recommendations.length === 0)
    return <p className="text-gray-500">No recommendations available yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl p-3 font-semibold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={service.image || "/default-service.jpg"}
              alt={service.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.category}</p>
            <p className="mt-2 font-semibold text-green-600">₦{service.price}</p>
            <button onClick={() => navigate(`/service/${service.id}`)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
