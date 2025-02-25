import { Outlet, NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white  p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink to="/admin/" className="block p-2 hover:bg-gray-700 rounded">
                Manage Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="add-package"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Add Package
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-users"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-candidates"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Candidates
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div>
          <h2 className="text-3xl text-center"></h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
