import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStories = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageUrls(e.target.value.split(","));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const storyData = {
      title,
      text,
      images: imageUrls,
    };
    
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyData),
      });
      
      if (response.ok) {
        navigate("/manage-stories");
      } else {
        console.error("Failed to add story");
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add a Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Story</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URLs (comma-separated)</label>
          <input
            type="text"
            value={imageUrls.join(",")}
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            placeholder="Enter image URLs separated by commas"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStories;
