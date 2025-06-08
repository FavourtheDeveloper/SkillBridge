
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({product}) => {
    const navigate = useNavigate();
  return (
    <div
    
    key={product.id}
    onClick={() => navigate(`/service/${product.id}`)}
    className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      {/* Top Image */}
      <img
        src="/html-conversion-banner.jpg"
        alt="HTML Conversion"
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Seller Info */}
        <div className="flex items-center space-x-3">
          <img
            src="/seller.jpg"
            alt="Nancy Reyes"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{product.category}</h3>
            <p className="text-xs text-gray-500">{product.title}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2">
        {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-500 text-sm">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="currentColor" />
          ))}
          <Star size={14} className="text-gray-300" />
          <span className="text-gray-600 ml-2 font-medium">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center pt-2">
          <p className="text-sm text-gray-500">Starting at</p>
          <p className="text-sm font-semibold text-gray-900">$10.00</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
