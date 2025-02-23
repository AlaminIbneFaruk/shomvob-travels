import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "text-black" : "text-white");

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-400 shadow-md p-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-2">
      <Link to="/" className={`text-white btn btn-ghost py-2 font-extrabold font-sans text-lg lg:text-3xl`}>
          Shomvob Travels
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className={`${isActive("/")} text-white btn btn-outline py-2`}>
          Home
        </Link>
        <Link to="/community" className={`${isActive("/community")} text-white btn btn-outline py-2`}>
          Community
        </Link>
        <Link to="/about" className={`${isActive("/about")} text-white btn btn-outline py-2`}>
          About Us
        </Link>
        <Link to="/trips" className={`${isActive("/trips")} text-white btn btn-outline py-2`}>
          Trips
        </Link>
        {!user && (
          <>
            <Link to="/login" className={`${isActive("/login")} btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500 `}>
              Login
            </Link>
            <Link to="/register" className={`${isActive("/register")} btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500 `}>
              Register
            </Link>
          </>
        )}
        {user && (
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
              <img src={user.photoURL || FaUserCircle} alt="Profile" className="w-10 h-10 rounded-full border border-white" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg p-4">
                <p className="text-gray-800 font-bold">{user.displayName}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <hr className="my-2" />
                <Link to="/dashboard" className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded">
                  Dashboard
                </Link>
                <Link to="/offers" className="block text-gray-800 hover:bg-gray-100 px-2 py-1 rounded">
                  Offer Announcements
                </Link>
                <button onClick={signOutUser} className="w-full text-left text-red-600 hover:bg-red-100 px-2 py-1 rounded mt-2">
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
          <Link to="/" className={`${isActive("/")} text-white py-2`} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/community" className={`${isActive("/community")} text-white py-2`} onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          <Link to="/about" className={`${isActive("/about")} text-white py-2`} onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/trips" className={`${isActive("/trips")} text-white py-2`} onClick={() => setMenuOpen(false)}>
            Trips
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500 mt-2" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-outline btn hover:underline bg-gradient-to-r from-cyan-400 to-blue-500  mt-2" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white py-2" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/offers" className="text-white py-2" onClick={() => setMenuOpen(false)}>
                Offer Announcements
              </Link>
              <button onClick={() => { signOutUser(); setMenuOpen(false); }} className="text-red-600 py-2">
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