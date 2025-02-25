import { useEffect, useState } from 'react';

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/userStories.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading stories...</div>; // Loading feedback
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Stories</h2>
      {stories.length === 0 ? (
        <div className="alert alert-warning">No stories available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="card bg-base-100 shadow-xl">
              <figure>
                {story.image ? (
                  <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">No Image</div>
                )}
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-semibold">{story.name}</h3>
                <p className="text-sm text-gray-600">Rating: {story.rating}</p>
                <p className="text-gray-800">{story.comment}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;
