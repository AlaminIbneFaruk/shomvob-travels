import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStories = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const urls = e.target.value
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    setImageUrls(urls.length ? urls : [""]);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (title.length < 3) {
      toast.error("Title must be at least 3 characters long");
      setIsSubmitting(false);
      return;
    }

    if (text.length < 10) {
      toast.error("Story must be at least 10 characters long");
      setIsSubmitting(false);
      return;
    }

    // Validate image URLs
    const invalidUrls = imageUrls.filter((url) => url && !validateUrl(url));
    if (invalidUrls.length > 0) {
      toast.error("Please enter valid URLs for all images");
      setIsSubmitting(false);
      return;
    }

    const storyData = {
      title,
      text,
      images: imageUrls.filter((url) => url !== ""),
    };

    try {
      const response = await axios.post(
        "https://assignment-12-server-three-iota.vercel.app/stories",
        storyData,
        {
          timeout: 10000, // Add timeout for network requests
        }
      );
      console.log(response.data);
      toast.success("Story added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/manage-stories");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error submitting story: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Add a Story</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
              required
              disabled={isSubmitting}
              maxLength={100}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="story" className="block text-sm font-medium mb-1">
              Story
            </label>
            <textarea
              id="story"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-300"
              required
              disabled={isSubmitting}
              maxLength={5000}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium mb-1">
              Image URLs (comma-separated)
            </label>
            <input
              id="images"
              type="text"
              value={imageUrls.join(",")}
              onChange={handleImageChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300"
              placeholder="Enter image URLs separated by commas"
              disabled={isSubmitting}
            />
            {imageUrls.length > 0 && imageUrls[0] && (
              <p className="text-sm text-gray-500 mt-1">
                {imageUrls.length} image URL(s) detected
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
            transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Story"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStories;
