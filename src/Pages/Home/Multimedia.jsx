import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Multimedia = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Bangladesh.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4 bg-black bg-opacity-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-6xl font-bold mb-4">
          Elevate Your Travel Experience
        </h3>
        <p className="text-xl max-w-2xl mb-6">From bucket list to booked.</p>
        {/* Call to Action Button using Link */}
        <Link 
          to="/booking" 
          className="btn btn-outline  border border-b-4 mt-4 px-6 py-2 bg-sky-500 text- font-semibold rounded-lg shadow-lg transition duration-300 hover:bg-yellow-400"
        >
          Book Your Adventure
        </Link>
      </motion.div>
    </div>
  );
};

export default Multimedia;
