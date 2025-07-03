import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ product }) => {

  const { title, image, price, category, description, User } = product;

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/service/${product.id}`)} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{category}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          {/* 👇 Artisan name */}
        {User?.name && (
          <p className="text-sm text-gray-400">By <span className="font-medium">{User.name}</span></p>
        )}

          
        </div>

        <div className="mb-2 mt-1">
          <span className="text-blue-700 font-bold text-lg">₦{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
