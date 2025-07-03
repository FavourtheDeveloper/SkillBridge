import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api";

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    latitude: null,
    longitude: null,
  });

  // Get coordinates on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRegisterData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => {
          console.warn("Geolocation error:", err);
          Swal.fire("Warning", "Location access denied or unavailable.", "warning");
        }
      );
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginData.email && loginData.password) {
      try {
        const response = await API.post("/auth/login", loginData);
        const { token, user } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        Swal.fire("Success!", `Logged in as ${user.email}`, "success");

        navigate(user.role === "artisan" ? "/dashboard" : "/services");
      } catch (error) {
        Swal.fire("Error", error.response?.data?.error || "Login failed", "error");
      }
    } else {
      Swal.fire("Error!", "Please fill in all fields.", "error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const { confirmPassword, ...data } = registerData;

      const response = await API.post("/auth/register", data);
      const { user } = response.data;

      Swal.fire("Success!", `Registered as ${user.email}`, "success");
      navigate(user.role === "artisan" ? "/dashboard" : "/services");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 font-semibold ${
                activeTab === "login"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-semibold ${
                activeTab === "register"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                Login
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Register As</label>
                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="artisan">Artisan</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              {/* Location preview (optional) */}
              {registerData.latitude && registerData.longitude && (
                <p className="text-xs text-green-600">
                  Location captured: ({registerData.latitude.toFixed(4)}, {registerData.longitude.toFixed(4)})
                </p>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
