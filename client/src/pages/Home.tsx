import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className="bg-blue-950 w-9/10 mx-auto mt-9 rounded-4xl text-white">
            <h2 className="text-5xl font-poppins font-extrabold leading-18 p-20"> 🚀 Welcome to SkillBridge – <br /> Where Skills Meet Opportunity!</h2>
        </div>
        <div className="text-center m-6">
        <Link to={"/dashboard"}><button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all">
   Get Started
   </button></Link> 
        </div>
        <div className="mt-7">
            <h3 className="text-center font-bold text-3xl p-4">🎯 Why Choose SkillBridge?</h3>
            <div className="flex justify-around text-white pt-4 w-9/10 mx-auto">
                <div className="bg-blue-950 p-4 rounded-xl">
                    <h5 className="font-bold text-center py-3">✅ Speed & Convenience</h5>
                    <p className="pb-3">No more long searches—get matched instantly.</p>
                </div>

                <div className="bg-blue-950 p-4 rounded-xl">
                    <h5 className="font-bold text-center py-3">✅ Verified Experts</h5>
                    <p className="pb-3">Only skilled handworkers, ensuring top-notch service.</p>
                </div>

                <div className="bg-blue-950 p-4 rounded-xl">
                    <h5 className="font-bold text-center py-3">✅ Speed & Convenience</h5>
                    <p className="pb-3">Easy, hassle-free process from request to completion.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home