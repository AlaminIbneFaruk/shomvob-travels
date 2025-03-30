import { useState } from "react";
import { Helmet } from "react-helmet";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaLocationArrow,
  FaPlusCircle,
  FaArrowCircleLeft,
} from "react-icons/fa";

const TourGuideDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const DashboardTheme = {
    title: "Tour Guide Dashboard",
    sidebarItems: [
      {
        icon: <FaUserCircle />,
        label: "Manage Profile",
        path: "/tourguidedashboard",
      },
      {
        icon: <FaLocationArrow />,
        label: "My Assigned Tours",
        path: "assigned-tours",
      },
      { icon: <FaPlusCircle />, label: "Add Stories", path: "add-stories" },
      { icon: <FaArrowCircleLeft />, label: "Home", path: "/" },
    ],
  };

  const isActive = (path) =>
    location.pathname === path
      ? "font-bold underline text-black"
      : "text-white";

  return (
    <>
      <Helmet>
        <title>Tour Guide Dashboard | Shomvob Travels</title>
      </Helmet>
      <div className="flex bg-sky-200 flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`bg-blue-600 text-white p-4 shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } fixed md:relative h-full md:h-auto z-10`}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none mb-4 transition-all duration-300"
          >
            <img
              src="https://i.ibb.co.com/DgDYdY8J/Shomvob-travels.png"
              alt="logo"
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-32" : "w-12"
              }`}
            />
          </button>

          <nav className="space-y-4">
            {DashboardTheme.sidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={`block ${isActive(item.path)}`}
              >
                <div className="flex items-center space-x-3 p-2 hover:bg-white hover:text-black rounded cursor-pointer text-white">
                  {item.icon}
                  {isSidebarOpen && <span>{item.label}</span>}
                </div>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-10 w-full">
            <h1 className="text-xl font-semibold">{DashboardTheme.title}</h1>
          </header>

          {/* Content Area */}
          <div className="h-[100vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourGuideDashboard;
