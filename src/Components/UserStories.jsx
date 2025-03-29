import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthProvider";

const UserStories = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Configure axios instance
  const axiosInstance = axios.create({
    baseURL: '/', // Adjust base URL as needed
  });

  // Fetch reviews using TanStack Query
  const { data: reviews = [], isLoading, isError, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await axiosInstance.get('stories.json');
      return response.data;
    },
    // Optional configurations
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
    retry: 2, // Retry failed requests twice
  });

  const handleShareClick = (event) => {
    if (!user) {
      event.preventDefault();
      navigate("/login");
    }
  };

  if (isLoading) return (
    <p className="text-center text-gray-500">Loading...</p>
  );

  if (isError) return (
    <p className="text-center text-red-500">
      Error loading stories: {error.message}
    </p>
  );

  return (
    <div className="p-6 bg-sky-200">
      <h2 className="text-lg md:text-2xl lg:text-5xl font-bold text-center mb-6">
        User Stories
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 max-w-4xl mx-auto">
          No reviews yet. Be the first to share your experience!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-xl border">
              <div className="card-body flex justify-center">
                <img
                  src={review.image || "https://placehold.co/600x400"}
                  alt={review.name}
                  className="rounded-lg mb-4"
                />
                <h3 className="card-title text-lg">{review.name}</h3>

                <div className="rating rating-sm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className={`mask mask-star-2 ${i < review.rating ? "bg-yellow-500" : "bg-gray-300"}`}
                      disabled
                    />
                  ))}
                </div>

                <p className="text-gray-600">{review.comment}</p>

                <div className="flex justify-between space-x-4 mt-4">
                  <div onClick={handleShareClick}>
                    <FacebookShareButton url={window.location.href} quote={review.comment}>
                      <FaFacebook className="text-3xl text-blue-600 cursor-pointer" />
                    </FacebookShareButton>
                  </div>

                  <div onClick={handleShareClick}>
                    <TwitterShareButton url={window.location.href} title={review.comment}>
                      <FaTwitter className="text-3xl text-blue-400 cursor-pointer" />
                    </TwitterShareButton>
                  </div>

                  <div onClick={handleShareClick}>
                    <LinkedinShareButton url={window.location.href} title={review.comment}>
                      <FaLinkedin className="text-3xl text-blue-700 cursor-pointer" />
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStories;