import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const PackagePlan2 = ({ packageplan }) => {
  const {
    _id,
    name,
    price,
    stockImages,
    tourType,
  } = packageplan;
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/package-details/${_id}`);
  };

  return (
    <div
      className="group w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 transition duration-300 
       hover:border-blue-600 hover:shadow-2xl "
    >
      {/* Image Collage Section */}
      <div className="relative h-64 mb-6">
        {/* First Image */}
        <img
          src={stockImages[0]}
          alt={`${name} package 1`}
          className="absolute top-0 left-[10%] w-2/3 h-48 object-cover rounded-lg transform -rotate-6 
          transition duration-300 hover:rotate-0 hover:z-20 pt-2 px-2 pb-10 shadow-xl bg-white"
        />
        {/* Second Image */}
        <img
          src={stockImages[1]}
          alt={`${name} package 2`}
          className="absolute top-0 left-[21%] w-2/3 h-48 object-cover rounded-lg transform rotate-0 
          transition duration-300 z-10 hover:scale-110 pt-2 px-2 pb-10 shadow-xl bg-white "
        />
        {/* Third Image */}
        <img
          src={stockImages[2]}
          alt={`${name} package 3`}
          className="absolute top-0 right-0 w-2/3 h-48 object-cover rounded-lg transform rotate-[21deg] 
          transition duration-300 hover:rotate-0 hover:z-10  pt-2 px-2 pb-10 shadow-xl bg-white"
        />
      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-xl font-bold transition">{name}</h3>
        <p className="mt-1 transition">Tour Type: {tourType}</p>
        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-600  transition">
            ৳{price.toFixed(2)}
          </span>
          <span className="transition"> / package</span>
        </div>
      </div>

      {/* Button Section */}
      <div
        className="bg-gray-100 rounded-lg shadow-md p-5 mt-4 transition duration-300"
      >
        <button
          className="btn btn-outline border-b-4 mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 
          hover:scale-105 border"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  );
};

PackagePlan2.propTypes = {
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
    stockImages: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

export default PackagePlan2;