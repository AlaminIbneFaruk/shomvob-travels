import PropTypes from 'prop-types';

const PackagePlan = ({ packageplan }) => {
  const {
    name,
    duration,
    price,
    description = "No description available.", // Fallback value
    inclusions,
    destination,
    highlights,
    image, // New property for image URL
  } = packageplan;

  const handleBookNow = () => {
    // Logic for booking, e.g., redirecting to a booking page
    alert(`Booking for ${name} initiated!`);
  };

  return (
    <div
      className="group w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 transition duration-300 
      hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-2xl hover:scale-105"
    >
      {/* Outer Section */}
      <div className="text-center">
        <img
          src={image} // Display the image
          alt={`${name} package`}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold transition">{name}</h3>
        <p className="mt-1 transition">{description}</p>
        <p className="mt-1 transition">Destination: {destination}</p>
        <p className="mt-1 transition">Duration: {duration}</p>

        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-600 group-hover:text-white transition">
            ৳{price.toFixed(2)}
          </span>
          <span className="transition"> / package</span>
        </div>
      </div>
      <div
        className="bg-gray-100 rounded-lg shadow-md p-5 mt-4 transition duration-300 
        group-hover:bg-blue-700 group-hover:text-white"
      >
        <h4 className="text-lg font-semibold text-gray-800 transition group-hover:text-white">
          Inclusions:
        </h4>
        <ul className="mt-2 space-y-2 text-gray-600 transition group-hover:text-white">
          {inclusions.map((inclusion, index) => (
            <li key={index}>✅ {inclusion}</li>
          ))}
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 transition group-hover:text-white mt-4">
          Highlights:
        </h4>
        <ul className="mt-2 space-y-2 text-gray-600 transition group-hover:text-white">
          {highlights.map((highlight, index) => (
            <li key={index}>✅ {highlight}</li>
          ))}
        </ul>

        <button
          className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 
          hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
          onClick={handleBookNow} // Added onClick handler
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

PackagePlan.propTypes = {
  packageplan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    inclusions: PropTypes.arrayOf(PropTypes.string).isRequired,
    destination: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired, // New prop type for image URL
  }).isRequired,
};

export default PackagePlan;
