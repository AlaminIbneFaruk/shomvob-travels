import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Hero = ({ title, description, image, buttonText, motionEffect }) => {
  const navigate = useNavigate();

  return (
    <div className="hero text-black w-full flex flex-col lg:flex-row-reverse items-center mx-auto relative">
      {/* Image Section in <figure> */}
      {image && (
        <figure className="w-full lg:w-1/3">
          <motion.img
            src={image}
            alt={title || "Hero Image"}
            className="w-full object-cover lg:h-[60%] rounded-none lg:rounded-e-lg shadow-none"
            initial={{
              opacity: 0,
              x: motionEffect === "slide" ? 100 : 0,
              scale: 1.05,
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </figure>
      )}

      {/* Text Section */}
      <div className="absolute lg:relative inset-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-6 w-full lg:w-2/3 -z-10 lg:z-10 bg-black bg-opacity-50 lg:bg-opacity-0 text-white lg:text-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h1>
        <p className="py-4 text-sm sm:text-md md:text-lg">{description}</p>
        {buttonText && (
          <button
            className="btn border border-b-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:scale-105 transition-transform focus:ring-2 focus:ring-blue-300"
            onClick={() => navigate("/trips")}
          >
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
  motionEffect: PropTypes.oneOf(["slide", "fade"]),
};

export default Hero;
