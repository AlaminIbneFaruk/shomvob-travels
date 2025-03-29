import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Hero = ({ title, description, image, buttonText, motionEffect }) => {
  console.log(title, description, image, buttonText, motionEffect);
  const navigate = useNavigate();
  return (
    <div className="hero min-h-screen text-black w-full flex flex-col lg:flex-row items-center mx-auto p-6 bg-sky-200 relative">
      <div
        className="p-6 w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center order-1 lg:order-none z-10
        absolute lg:relative inset-0 bg-black bg-opacity-50 lg:bg-opacity-0 text-white lg:text-black sm:p-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h1>
        <p className="py-4 text-sm sm:text-md md:text-lg">{description}</p>
        {buttonText && (
          <button
            className="btn btn-outline  border border-b-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:scale-105 transition-transform"
            onClick={() => {
              navigate("/trips");
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
      {image && (
        <motion.img
          src={image}
          className="w-full h-full object-cover absolute inset-0 lg:relative lg:w-1/2 lg:h-auto rounded-none lg:rounded-lg shadow-none lg:shadow-2xl my-0 lg:my-6 order-2 lg:order-none -z-0"
          animate={{ x: motionEffect === "slide" ? [100, 0] : 0 }}
          transition={{ duration: 1 }}
          alt="Hero"
        />
      )}
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
