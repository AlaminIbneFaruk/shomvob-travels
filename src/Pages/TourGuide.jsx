import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const fetchTourGuide = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const response = await axios.get(`http://localhost:9000/guides/${id}`);
    if (!response.data) {
      throw new Error('No tour guide data found');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tour guide details');
  }
};

const TourGuide = () => {
  const { id } = useParams();

  const { 
    data: tourGuide, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: ['tourGuide', id],
    queryFn: fetchTourGuide,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    document.title = isLoading ? 'Loading...' : `${tourGuide?.name || 'Tour Guide'} Details`;
  }, [isLoading, tourGuide?.name]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5 mt-[5vh] text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error.message}</span>
          <button className="btn btn-sm btn-ghost" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 mt-[5vh] mx-auto bg-sky-200">
      <h1 className="text-3xl font-bold text-center mb-5">Tour Guide Profile</h1>
      <div className="flex flex-col md:flex-row bg-base-100 shadow-lg rounded-lg overflow-hidden">
        <figure className="md:w-1/3">
          <img 
            src={tourGuide.image || '/default-guide.jpg'} 
            alt={tourGuide.name} 
            className="w-full h-full object-cover object-center"
            loading="lazy"
            onError={(e) => { e.target.src = '/default-guide.jpg'; }}
          />
        </figure>
        <div className="card-body p-5 md:w-2/3">
          <div className="space-y-4">
            {/* Basic Info */}
            <div>
              <h2 className="card-title text-4xl font-bold font-sans">{tourGuide.name}</h2>
              <p className="text-base text-gray-500">Guide ID: {tourGuide.id}</p>
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className='font-bold text-lg p-2'>Languages:</p>  <p className='input border-2 p-2 border-sky-200'> {tourGuide.language?.join(', ') || 'Not specified'}</p>
                <p className='font-bold text-lg p-2'>Experience:</p> <p className='input border-2 p-2 border-sky-200'> {tourGuide.experience ? `${tourGuide.experience} years` : 'N/A'}</p>
                <p className='font-bold text-lg p-2'>Price:</p>      <p className='input border-2 p-2 border-sky-200'> {tourGuide.pricePerHour ? `$${tourGuide.pricePerHour}/hour` : 'Contact for pricing'}</p>
              </div>
              <div>
                {tourGuide.specialties?.length > 0 && (
                  <><p className='font-bold text-lg p-2'>Specialties:</p>
                  <p className='input p-2'> {tourGuide.specialties.join(', ')}</p></>
                )}
                {tourGuide.certifications?.length > 0 && (
                  <><p className='font-bold text-lg p-2'>Certifications:</p>
                  <p className='input p-2 border-2 border-sky-200'> {tourGuide.certifications.join(', ')}</p></>
                )}
              </div>
            </div>

            {/* Availability */}
            {tourGuide.availability && (
              <div>
                <p><strong>Availability:</strong></p>
                <p>{tourGuide.availability.days?.join(', ') || 'Flexible'} ({tourGuide.availability.hours || 'TBD'})</p>
              </div>
            )}

            {/* Contact */}
            {tourGuide.contact && (
              <div>
                <p><strong>Contact:</strong></p>
                <p>Email: {tourGuide.contact.email || 'N/A'}</p>
                <p>Phone: {tourGuide.contact.phone || 'N/A'}</p>
              </div>
            )}

            {/* Bio */}
            <div>
              <p><strong>About:</strong> {tourGuide.bio || 'No biography available'}</p>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button 
              className="btn btn-primary"
              onClick={() => window.open(`/guides/${id}/profile`, '_blank')}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;