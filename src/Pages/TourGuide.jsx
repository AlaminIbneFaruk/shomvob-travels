import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchTourGuide = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await axios.get(`http://localhost:9000/tour-guide-details/${id}`);
  if (!response.data) {
    throw new Error('Failed to fetch tour guide details');
  }
  return response.data;
};

const TourGuide = () => {
  const { id } = useParams();

  const { 
    data: tourGuide, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['tourGuide', id],
    queryFn: fetchTourGuide,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Tour Guide Details</h1>
      <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden">
        <figure className="md:w-1/3">
          <img 
            src={tourGuide.image} 
            alt={tourGuide.name} 
            className="w-full h-48 object-cover" 
          />
        </figure>
        <div className="card-body p-5 md:w-2/3">
          <h2 className="card-title text-xl font-semibold">{tourGuide.name}</h2>
          <p><strong>Languages:</strong> {tourGuide.language?.join(', ') || 'N/A'}</p>
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