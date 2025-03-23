import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TourGuide = () => {
  const [tourGuide, setTourGuide] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tour-guide-details/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour guides');
        }
        const data = await response.json();
        setTourGuide(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuides();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Tour Guide Details</h1>
      <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden">
        <figure className="md:w-1/3">
          <img src={tourGuide.image} alt={tourGuide.name} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body p-5 md:w-2/3">
          <h2 className="card-title text-xl font-semibold">{tourGuide.name}</h2>
          <p><strong>Languages:</strong> {tourGuide.language.join(', ')}</p>
          <p><strong>Experience:</strong> {tourGuide.experience} years</p>
          <p><strong>Bio:</strong> {tourGuide.bio}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;
