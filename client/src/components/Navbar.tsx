

const Navbar = () => {
  return (
    <div className="bg-blue-700">
    <div className="flex justify-between items-center w-9/10 mx-auto  text-white p-5">
        <div>
        <h1 className="text-5xl font-extrabold">SkillBridge</h1>
        </div>
        <div className="flex items-center text-lg">
            <p className="pr-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all">Login/Register</p>
           
        </div>
    </div>
    </div>
  )
}

export default Navbar