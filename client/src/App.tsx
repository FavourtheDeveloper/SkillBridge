import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
  );
}

export default App;
