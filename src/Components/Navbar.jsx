import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current path is inside dashboard routes
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isTourGuideDashboardPath = location.pathname.startsWith("/tourguidedashboard");
  const isAdminDashboardPath = location.pathname.startsWith("/admin");

  // Ref for closing dropdown on outside click
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "font-bold underline text-black" : "text-white";

  // Prevent navbar from rendering on dashboard pages
  if (isDashboardPath) return null;
  if (isTourGuideDashboardPath) return null;
  if (isAdminDashboardPath) return null;

  const handleLogout = () => {
    signOutUser();
    localStorage.removeItem("token"); // Remove JWT from local storage
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-400 shadow-md p-4 flex justify-between items-center z-50">
      <Link to="/" className="btn btn-ghost py-2 font-extrabold text-lg lg:text-3xl">
        Shomvob Travels
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {["/", "/community", "/about", "/trips"].map((route) => (
          <Link key={route} to={route} className={`${isActive(route)} btn btn-outline py-2`}>
            {route.replace("/", "").toUpperCase() || "HOME"}
          </Link>
        ))}

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline hover:underline bg-gradient-to-r from-cyan-400 to-blue-500">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline hover:underline bg-gradient-to-r from-cyan-400 to-blue-500">
              Register
            </Link>
          </>
        ) : (
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-white object-cover"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-sky-500" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white/90 backdrop-blur-lg shadow-lg rounded-lg p-4 w-48">
                <p className="text-gray-800 font-bold">{user.displayName}</p>
                <p className="text-gray-600 text-xs truncate">{user.email}</p>
                <hr className="my-2" />
                <Link to={`/admin`} className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded">
                  Dashboard
                </Link>
                <Link to="/offers" className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded">
                  Offers
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:bg-red-100 px-2 py-1 rounded mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-sky-400 shadow-md flex flex-col items-center p-4 md:hidden">
          {["/", "/community", "/about", "/trips"].map((route) => (
            <Link key={route} to={route} className={`${isActive(route)} py-2`} onClick={() => setMenuOpen(false)}>
              {route.replace("/", "").toUpperCase() || "HOME"}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500 mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500 mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to={`/dashboard/tourist/${user.uid}`} className="py-2" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/offers" className="py-2" onClick={() => setMenuOpen(false)}>
                Offers
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
