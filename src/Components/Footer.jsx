import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-10 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Company Info */}
        <div>
          <img
            src="https://i.ibb.co.com/DgDYdY8J/Shomvob-travels.png"
            alt="Shomvob travels logo"
            className="w-auto h-24 rounded-xl object-cover"
          />
          <h2 className="text-2xl font-semibold mb-3">Shomvob Travels</h2>
          <p className="text-gray-100">
            Shomvob Travels offers seamless travel experiences with curated
            tours, hassle-free bookings, and personalized itineraries for every
            journey.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-100 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-100 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/community" className="text-gray-100 hover:text-white">
                Community{" "}
              </a>
            </li>
            <li>
              <a href="/trips" className="text-gray-100 hover:text-white">
                Trips{" "}
              </a>
            </li>
            <li>
              <a href="/login" className="text-gray-100 hover:text-white">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="text-gray-100 hover:text-white">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-100 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-100 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-100 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-100 hover:text-white text-xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} My Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
