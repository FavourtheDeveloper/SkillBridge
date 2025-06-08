import Topbar from "../components/Topbar";
import ServiceImage from '../assets/images/servicesimg.jpg'
const Dashboard = () => {
  return (
    <>
    <Topbar />
    <div className="flex justify-around container m-auto">
        <div className="flex items-center bg-orange-500 rounded-2xl text-white p-10">
        <div>
            <h2 className="text-4xl pb-2">Good Morning, Favour</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            amet consectetur adipisicing elit. </p>
        </div>

        <div>
            <img className="w-32 h-32 mx-5 rounded-full object-cover" src={ServiceImage} alt="profilePic" />
        </div>
        </div>

        <div className="flex items-center bg-orange-500 rounded-2xl text-white p-10">
        <div>
            <h2 className="text-2xl pb-2">Invite your friends, reward yourself</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />  
            amet consectetur adipisicing elit. </p>
        </div>

        <div>
            <img className="w-32 h-32 mx-5 rounded-full object-cover" src={ServiceImage} alt="profilePic" />
        </div>
        </div>

        
    </div>

    <div className="container m-auto mt-7">
      <h2 className="text-xl font-extrabold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500">Total Gigs</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-sm text-gray-500">Completed Orders</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
