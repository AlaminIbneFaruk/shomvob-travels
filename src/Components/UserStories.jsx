import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthProvider";

const UserStories = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "/",
  });

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "https://assignment-12-server-three-iota.vercel.app/stories/random"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 2,
  });

  const handleShareClick = (event) => {
    if (!user) {
      event.preventDefault();
      navigate("/login");
    }
  };

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  if (isError)
    return (
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
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
            {reviews.map((review) => {
              const rating = Number(review.rating) || 0;

              return (
                <div
                  key={review._id || review.id}
                  className="card bg-base-100 shadow-xl border"
                >
                  <div className="card-body flex justify-center">
                    <img
                      src={
                        review.image?.trim()?.length
                          ? review.image
                          : "https://placehold.co/600x400"
                      }
                      alt={review.name || "User Story"}
                      className="rounded-lg mb-4"
                    />
                    <h3 className="card-title text-lg">{review.name}</h3>

                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600">
                      {review.comment || "Check out this amazing story!"}
                    </p>

                    <div className="flex justify-between space-x-4 mt-4">
                      <FacebookShareButton
                        url={currentURL}
                        quote={
                          review.comment || "Check out this amazing story!"
                        }
                        onClick={handleShareClick}
                      >
                        <FaFacebook className="text-3xl text-blue-600 cursor-pointer" />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={currentURL}
                        title={
                          review.comment || "Check out this amazing story!"
                        }
                        onClick={handleShareClick}
                      >
                        <FaTwitter className="text-3xl text-blue-400 cursor-pointer" />
                      </TwitterShareButton>

                      <LinkedinShareButton
                        url={currentURL}
                        title={
                          review.comment || "Check out this amazing story!"
                        }
                        onClick={handleShareClick}
                      >
                        <FaLinkedin className="text-3xl text-blue-700 cursor-pointer" />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigate("/community")}
            className="btn btn-primary text-white font-semibold px-6 py-2 rounded-lg"
          >
            All Stories
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStories;
