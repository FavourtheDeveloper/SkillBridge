import ServiceImage from '../assets/images/servicesimg.jpg'
const Topbar = () => {
  return (
    <div className="w-full h-16 bg-blue-700 text-white shadow flex justify-between mb-5 items-center px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-white">Hello, Artisan</span>
        <img
          src={ServiceImage}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
