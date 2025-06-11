import { useState } from "react";
import Swal from "sweetalert2";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    address: "123 Artisan Street, Lagos",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "Profile Updated Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 08012345678"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={3}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your home or work address"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
