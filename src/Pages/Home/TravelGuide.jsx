import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TravelGuide = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const res = await fetch("/tourguides.json");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setTourGuides(data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourGuides();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (isError) {
    return <p>Error loading tour guides.</p>;
  }

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Meet Our Tour Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tourGuides.map((guide) => (
          <motion.div
            key={guide.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="card">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 card-content">
                <h2 className="text-xl font-semibold">{guide.name}</h2>
                <p className="text-gray-600 text-sm">Languages: {guide.language.join(", ")}</p>
                <p className="text-gray-600 text-sm">Experience: {guide.experience}</p>
                <button
                  className="btn btn-info mt-2 w-full"
                  onClick={() => navigate(`/guide/${guide.id}`)}
                >
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
