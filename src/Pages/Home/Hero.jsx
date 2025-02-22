import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Hero = ({ title, description, image, buttonText, motionEffect }) => {
  return (
    <div className="hero min-h-screen text-black w-full flex flex-col md:flex-row items-center mx-auto px-6 bg-opacity-60 bg-sky-200 rounded-lg my-6">
      {image && (
        <motion.img
          src={image}
          className="w-full md:w-1/2 rounded-lg shadow-2xl"
          animate={{ x: motionEffect === "slide" ? [100, 0] : 0 }}
          transition={{ duration: 1 }}
        />
      )}
      <div className="p-6 w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        <p className="py-4 text-sm md:text-md">{description}</p>
        {buttonText && (
          <button className="btn bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  buttonText: PropTypes.string,
  motionEffect: PropTypes.string,
};

export default Hero;
