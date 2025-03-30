import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const PackagePlan = ({ packageplan }) => {
  const {
    _id,
    name,
    price,
    image,
    tourType 
  } = packageplan;
  const navigate = useNavigate();
  const handleViewMore = () => {
    // Logic for booking, e.g., redirecting to a booking page
    navigate(`/package-details/${_id}`);
  };

  return (
    <div
      className="group w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 transition duration-300 
      hover:bg-sky-600 hover:text-white hover:border-blue-600 hover:shadow-2xl hover:scale-105"
    >
      {/* Outer Section */}
      <div className="">
        <img
          src={image} // Display the image
          alt={`${name} package`}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold transition">{name}</h3>
        
        <p className="mt-1 transition">Tour Type: {tourType}</p>
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
        <button
          className="btn btn-outline border-b-4 mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 
          hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
          onClick={handleViewMore} // Added onClick handler
        >
          View More 
        </button>
      </div>
    </div>
  );
};

PackagePlan.propTypes = {
  packageplan: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    inclusions: PropTypes.arrayOf(PropTypes.string).isRequired,
    destination: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired, 
    tourType: PropTypes.string.isRequired, 
  }).isRequired,
};

export default PackagePlan;

/**
 * Have to add :
 * 1.Tour guides here and in the json in the database
 * 2.When clicking on specific tour guide goes to his details page
 * 3.A button to go to the bookings form 
 */