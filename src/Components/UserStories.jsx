import { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const UserStories = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/community")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

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
        <div className="grid gap-6 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                {review.image ? (
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-lg mb-4"
                  />
                ) : (
                  ""
                )}
                <h3 className="card-title text-lg">{review.name}</h3>

                {/* Star Rating Display */}
                <div className="rating rating-sm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className={`mask mask-star-2 ${
                        i < review.rating ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                      disabled
                    />
                  ))}
                </div>

                <p className="text-gray-600">{review.comment}</p>


                <div className="flex justify-between space-x-4 mt-4">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={review.comment}
                    className="flex items-center bg-blue-600 text-white p-2 rounded"
                  >
                    <FaFacebook className="mr-2 text-3xl" />
                    Share on Facebook
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={window.location.href}
                    title={review.comment}
                    className="flex items-center bg-blue-400 text-white p-2 rounded"
                  >
                    <FaTwitter className="mr-2 text-3xl" />
                    Share on Twitter
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={window.location.href}
                    title={review.comment}
                    className="flex items-center bg-blue-700 text-white p-2 rounded"
                  >
                    <FaLinkedin className="mr-2 text-3xl" />
                    Share on LinkedIn
                  </LinkedinShareButton>
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
