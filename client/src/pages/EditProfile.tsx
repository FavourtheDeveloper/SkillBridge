import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../api"; // Your configured Axios instance

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put("/users/me", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Profile Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

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
              readOnly // optional if you want to disable email edits
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
