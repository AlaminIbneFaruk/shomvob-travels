import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fetchTourGuides = async () => {
  const response = await axios.get("tourguides.json");
  if (!response.data) {
    throw new Error("Failed to fetch tour guides");
  }
  return response.data;
};

const TravelGuide = () => {
  const navigate = useNavigate();

  const { 
    data: guides = [], 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: fetchTourGuides,
  });

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError) return <p className="text-red-500">Error loading tour guides.</p>;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
        Meet Our Tour Guides
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[100vw] mx-auto">
        {guides.map((guide) => (
          <motion.div
            key={guide._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden w-full"
          >
            <div className="card card-side w-full flex flex-col md:flex-row">
              <figure className="w-full md:w-1/3">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-44 object-cover"
                />
              </figure>
              <div className="card-body p-4 w-full md:w-2/3">
                <h2 className="text-xl font-semibold card-title">{guide.name}</h2>
                <p className="text-gray-600 text-sm">
                  Languages: {guide.language?.join(", ") || 'N/A'}
                </p>
                <p className="text-gray-600 text-sm">
                  Experience: {guide.experience || 'Not specified'}
                </p>
                <div className="card-actions mt-2">
                  <button
                    className="btn btn-outline border border-b-4 btn-info w-full"
                    onClick={() => navigate(`/package-details`)} // Consider updating to guide-specific route
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuide;