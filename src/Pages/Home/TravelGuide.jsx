import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom hook for debouncing


const TravelGuide = () => {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

// Debounce the search input

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/tourguides.json");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []); // Empty dependency array to run only once on mount



  if (isLoading) {
    return <div className="loader">Loading...</div>; // Placeholder for loading
  }

  if (isError) {
    return <p>Error loading destinations.</p>; // Error message
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Explore Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations?.map((dest) => (
          <motion.div
            key={dest.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="card">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 card-content">
                <h2 className="text-xl font-semibold">{dest.name}</h2>
                <p className="text-gray-600 text-sm">{dest.description}</p>
                <button className="btn btn-info mt-2 w-full">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuide;
