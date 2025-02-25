import PropTypes from 'prop-types';
import { useState } from 'react';

const Gallery = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <img
        src={image}
        alt="Tour Image"
        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
        loading="lazy"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img src={image} alt="Full Image" className="w-auto max-h-screen rounded-lg" />
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Gallery.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Gallery;


