import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-950 w-11/12 mx-auto mt-9 rounded-3xl text-white p-10 md:p-20">
        <h2 className="text-3xl md:text-5xl font-poppins font-extrabold leading-snug">
          🚀 Welcome to SkillBridge – <br className="hidden sm:block" /> Where Skills Meet Opportunity!
        </h2>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-6">
        <Link to="/services">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all">
            Get Started
          </button>
        </Link>
      </div>

      {/* Why Choose Section */}
      <div className="mt-8 px-4">
        <h3 className="text-center font-bold text-2xl md:text-3xl p-4">
          🎯 Why Choose SkillBridge?
        </h3>

        <div className="flex flex-col md:flex-row justify-center gap-6 text-white w-11/12 mx-auto">
          <div className="bg-blue-950 p-6 rounded-xl text-center">
            <h5 className="font-bold py-3">✅ Speed & Convenience</h5>
            <p>No more long searches—get matched instantly.</p>
          </div>

          <div className="bg-blue-950 p-6 rounded-xl text-center">
            <h5 className="font-bold py-3">✅ Verified Experts</h5>
            <p>Only skilled handworkers, ensuring top-notch service.</p>
          </div>

          <div className="bg-blue-950 p-6 rounded-xl text-center">
            <h5 className="font-bold py-3">✅ Easy Process</h5>
            <p>Hassle-free flow from request to service completion.</p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
