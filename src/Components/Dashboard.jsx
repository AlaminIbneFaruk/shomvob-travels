import { useContext, useState } from "react";
import { Home, Users, BarChart, Settings, Menu, ArrowBigLeft } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const DashboardTheme = {
    title: "Dashboard",
    sidebarItems: [
      { icon: <Home />, label: "Dashboard", path: `/userdashboard/${user?.uid}` },
      { icon: <Users />, label: "Users", path: "/users" },
      { icon: <BarChart />, label: "Analytics", path: "/analytics" },
      { icon: <Settings />, label: "Settings", path: "/settings" },
      { icon: <ArrowBigLeft />, label: "Back", path: "/" }
    ]
  };

  // Fixing the isActive function
  const isActive = (path) =>
    location.pathname === path ? "font-bold underline text-black" : "text-white";

  return (
    <div className="flex h-screen bg-sky-200 flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-sky-400 text-white p-4 shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed md:relative h-full md:h-auto z-10`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="btn btn-ghost mb-4"
        >
          <Menu className="text-white" />
        </button>

        <nav className="space-y-4">
          {DashboardTheme.sidebarItems.map((item, index) => (
            <Link to={item.path} key={index} className={`block ${isActive(item.path)}`}>
              <div className="flex items-center space-x-3 p-2 hover:bg-white hover:text-black rounded cursor-pointer text-white">
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-10 w-full">
          <h1 className="text-xl font-semibold">{DashboardTheme.title}</h1>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
          />
        </header>

        {/* Content Area */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
