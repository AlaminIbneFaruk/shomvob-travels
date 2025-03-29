import { useNavigate, Outlet } from "react-router-dom";

const Choice = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "User",
      description: "Explore and enjoy the platform as a regular user",
      icon: "👤",
      path: "/user-dashboard",
    },
    {
      title: "Tourist Guide",
      description: "Create and share guided tours with visitors",
      icon: "🗺️",
      path: "/guide-dashboard",
    },
    {
      title: "Admin",
      description: "Manage content and users on the platform",
      icon: "⚙️",
      path: "/admin-dashboard",
    },
  ];

  const handleRoleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Role Selection Section */}
      <div className="flex items-center justify-center p-4 flex-grow">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Choose Your Role</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleRoleSelect(role.path)}
              >
                <div className="text-4xl mb-4 text-center">{role.icon}</div>
                <h2 className="text-xl font-semibold text-center mb-2">{role.title}</h2>
                <p className="text-gray-600 text-center">{role.description}</p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents double navigation from card click
                    handleRoleSelect(role.path);
                  }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Choice;