import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthProvider";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-400 shadow-md p-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-white">Shomvob Travels</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/community" className="text-white hover:underline">
          Community
        </Link>
        <Link to="/about" className="text-white hover:underline">
          About Us
        </Link>
        <Link to="/trips" className="text-white hover:underline">
          Trips
        </Link>
        {!user ? (
          <>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-white hover:underline">
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={user.photoURL || FaUserCircle}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-white"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg p-4">
                <p className="text-gray-800 font-bold">{user.displayName}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <hr className="my-2" />
                <Link
                  to="/dashboard"
                  className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  to="/offers"
                  className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  Offer Announcements
                </Link>
                <button
                  onClick={signOutUser}
                  className="w-full text-left text-red-600 hover:bg-red-100 px-2 py-1 rounded mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
