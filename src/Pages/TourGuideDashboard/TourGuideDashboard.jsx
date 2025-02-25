import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes,  FaLocationArrow, FaSignOutAlt, FaUserCircle, FaBook, FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";

const TourGuideDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className={`bg-blue-600 text-white w-64 p-5 fixed md:relative h-full md:h-auto  transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Tour Guide Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/tourguidedashboard/" className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded">
              <FaUserCircle /> Manage Users
            </Link>
          </li>
          <li>
            <Link to="/tourguidedashboard/assignedtours" className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded">
              <FaLocationArrow /> My Assigned Tours
            </Link>
          </li>
          <li>
            <Link to="/tourguidedashboard/add-stories" className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded">
              <FaPlusCircle /> Add Stories
            </Link>
          </li>
          <li>
            <Link to="/tourguidedashboard/manage-stories" className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded">
              <FaBook /> Manage Stories
            </Link>
          </li>
          <li>
            <button className="flex items-center gap-2 hover:bg-red-500 p-2 rounded w-full text-left">
              <FaSignOutAlt /> Logout
            </button>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 hover:bg-red-500 p-2 rounded w-full text-left">
              <FaArrowCircleLeft /> Home
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-blue-600 text-2xl mb-4"
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

        {/* Dashboard Overview */}
        <Outlet/>
      </div>
    </div>
  );
};

export default TourGuideDashboard;
